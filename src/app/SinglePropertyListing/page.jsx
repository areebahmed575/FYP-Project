import Image from 'next/image'

export default function Home() {
  return (
    <div className="container mx-auto px-4 mt-16 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">luxe•skardu•gilgit•snow desert•pakistan</h1>
        <div className="flex space-x-2">
          <button className="bg-white px-4 py-2 rounded-full shadow text-sm font-semibold flex items-center">
            <span className="mr-2"></span> Share
          </button>
          <button className="bg-white px-4 py-2 rounded-full shadow text-sm font-semibold flex items-center">
            <span className="mr-2"></span> Save
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 grid-rows-2 gap-2 mb-4 h-[500px]">
        <Image src="/sk1.webp" alt="Resort exterior" width={800} height={600} className="col-span-2 row-span-2 w-full h-full object-cover rounded-l-lg" />
        <Image src="/sk2.webp" alt="Interior" width={400} height={300} className="w-full h-full object-cover rounded-tr-lg" />
        <Image src="/sk3.webp" alt="View" width={400} height={300} className="w-full h-full object-cover" />
        <Image src="/sk4.webp" alt="Guests" width={400} height={300} className="w-full h-full object-cover" />
        <Image src="/sk5.webp" alt="Additional view" width={400} height={300} className="w-full h-full object-cover rounded-br-lg" />
      </div>

      
      <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full shadow text-sm font-semibold">
        <span className="mr-2"></span> Show all photos
      </button>

      
      {/* <div className="absolute top-4 right-4 flex space-x-2 mb-56">
        <button className="bg-white px-4 py-2 rounded-full shadow text-sm font-semibold flex items-center">
          <span className="mr-2">↗️</span> Share
        </button>
        <button className="bg-white px-4 py-2 rounded-full shadow text-sm font-semibold flex items-center">
          <span className="mr-2">♡</span> Save
        </button>
      </div> */}
    </div>
  )
}