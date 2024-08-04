/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TKk3L3zCvEF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container grid items-center justify-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
            Our Achievements
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powering the Future of the Web
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our platform helps teams of all sizes build, deploy, and scale the best web experiences. With automated
            CI/CD, built-in testing, and integrated collaboration, we empower developers to focus on shipping features
            instead of managing infrastructure.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Card className="flex flex-col">
            <CardHeader>
              <CardDescription>Total Users</CardDescription>
              <CardTitle>1.2M+</CardTitle>
            </CardHeader>
            <CardContent>
              <UsersIcon className="h-12 w-12 text-primary" />
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardDescription>Projects Completed</CardDescription>
              <CardTitle>15K+</CardTitle>
            </CardHeader>
            <CardContent>
              <BriefcaseIcon className="h-12 w-12 text-primary" />
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardDescription>Awards Won</CardDescription>
              <CardTitle>50+</CardTitle>
            </CardHeader>
            <CardContent>
              <TrophyIcon className="h-12 w-12 text-primary" />
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardDescription>Countries Served</CardDescription>
              <CardTitle>190+</CardTitle>
            </CardHeader>
            <CardContent>
              <GlobeIcon className="h-12 w-12 text-primary" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function BriefcaseIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function GlobeIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}


function TrophyIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}


function UsersIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}


function XIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}