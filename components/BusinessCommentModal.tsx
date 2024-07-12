"use client";

import Image from "next/image";
import {
  PiCaretUpFill,
  PiChatCircle,
  PiTrash,
  PiUpload,
  PiUploadSimple,
} from "react-icons/pi";
import CarouselComponent from "@/components/carousel-component";
import { useState } from "react";
import { commentOnProduct, deleteComment, upvoteProduct } from "@/lib/Business-server-action";
import { Badge } from "./ui/badge";

interface ProductModalContentProps {
  currentProduct: any;
  authenticatedUser: any;
  totalUpvotes: number;
  hasUpvoted: boolean;
  setTotalUpvotes: any;
  setHasUpvoted: any;
}

const ProductModalContent: React.FC<ProductModalContentProps> = ({
  currentProduct,
  authenticatedUser,
  totalUpvotes,
  hasUpvoted,
  setTotalUpvotes,
  setHasUpvoted,
}) => {
  const [commentText, setCommentText] = useState("");

  
  const [shareModalModalVisible, setShareModalVisible] = useState(false);

  const [comments, setComments] = useState(currentProduct.commentData || []);

  const handleShareClick = () => {
    setShareModalVisible(true);
  };

  const handleCommentSubmit = async () => {
    try {
      // call the comment server action with the product id and the comment text
      await commentOnProduct(currentProduct.id, commentText);

      //reset the comment text
      setCommentText("");
      setComments([
        ...comments,
        {
          user: authenticatedUser.user.name,
          body: commentText,
          profile: authenticatedUser.user.image,
          userId: authenticatedUser.user.id,
          timestamp: new Date().toISOString(),
        }
      ])
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (event: any) => {
    setCommentText(event.target.value);
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      // Call the deleteComment function with the comment ID
      await deleteComment(commentId);
      // Filter out the deleted comment from the comments state
        setComments(comments.filter((comment: any) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };

  const handleUpvoteClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    try {
      await upvoteProduct(currentProduct.id);
      setTotalUpvotes(hasUpvoted ? totalUpvotes - 1 : totalUpvotes + 1);
      setHasUpvoted(!hasUpvoted);
    } catch (error) {
      console.error("Error upvoting product:", error);
      
    }
  }







  return (
    <div className="h-full">
      <div className="md:w-4/5 mx-auto">
    <div className="py-2 space-y-2">
          <h1 className="font-semibold pt-10">Post a Comment</h1>

          <div>
            <div className="w-full flex gap-4 mt-4">
              <Image
                src={authenticatedUser.user.image}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full h-12 w-12"
              />

              <textarea
                value={commentText}
                onChange={handleCommentChange}
                placeholder="What do you think about this product?"
                className="w-full rounded-md p-4 
                focus:outline-none text-gray-600"
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleCommentSubmit}
                className="bg-green-600 text-white p-2 rounded-md"
              >
                Comment On this Business
              </button>
            </div>
          </div>

          <div className="py-8 space-y-8">
            {comments.map((comment: any) => (
              <div key={comment.id} className="flex gap-4">
                <Image
                  src={comment.profile}
                  alt="profile"
                  width={50}
                  height={50}
                  className="w-8 h-8 rounded-full mt-1 cursor-pointer"
                />

                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-x-2 items-center">
                      <h1 className="text-gray-600 font-semibold cursor-pointer">
                        {comment.user}
                      </h1>
                      {comment.userId === currentProduct.userId && (
                        <Badge className="bg-[#88aaff]">Creator</Badge>
                      )}

                      <div className="text-gray-500 text-xs">
                        {new Date(comment.timestamp).toDateString()}
                      </div>
                      </div>

                      {(comment.userId === authenticatedUser?.user?.id ||
                        currentProduct.userId ===
                          authenticatedUser?.user?.id) && (
                        <PiTrash
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-500 hover:cursor-pointer"
                        />
                      )}
    
                    </div>

                    <div className="text-gray-600 text-sm 
                    hover:cursor-pointer mt-2">
                      {comment.body}
                    </div>
               
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductModalContent;
