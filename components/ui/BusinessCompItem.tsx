"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card"
import AverageRating from "../navbar/businessaveragerating";

interface ProductItemProps {
  product: any;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Link href={`/Business/${product.slug}`}>  
    <Card className="w-full bg-[#f5f3f3] border-[0px] mr-8 max-w-[250px] rounded-md overflow-hidden ">
      <div className="relative w-full h-1/2">  
        <Image 
          src={product.logo} 
          alt={product.name}  
          width="200"
          height="200"
          style={{ aspectRatio: "200/200", objectFit: "cover" }}
          objectFit="cover"  
          className="w-full rounded-xl h-48 object-cover"
        />  
      </div>  
      <CardContent className="p-4 bg-transparent rounded-md">
        <div className="flex flex-col items-start gap-2">
          <AverageRating productId={product.id} />
          <div className="flex items-center gap-1 text-primary">
            <h3 className="text-lg font-bold">{product.name}</h3>
          </div>
        </div>
      </CardContent>  
    </Card>
  </Link>  
);  
};  
export default ProductItem;
