import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"


export default async function Page({ params }) {
      const resolvedParams = await params;
  const shorturl = resolvedParams.shorturl;

    console.log("PARAM:", shorturl);

    const client = await clientPromise;
    const db = client.db("bitlinks")
    const collection = db.collection("url")

    const doc = await collection.findOne({shorturl: shorturl})
     console.log("DOC:", doc);
    if(doc?.url){
         redirect(doc.url)
    }
    else {
        redirect('/'); 
    }

   
    return null;
  }