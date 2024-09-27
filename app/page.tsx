import Header from "@/components/Header";
import PreviewScreen from "@/components/PreviewScreen";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center py-6 sm:py-5 bg-add-new min-h-screen">
      <div className="container-xs flex flex-col gap-6 md:px-5 flex-grow">
        <Header/>
        <PreviewScreen/>
      </div>
    </div>
  )
}