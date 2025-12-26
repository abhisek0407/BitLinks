import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const client=await clientPromise;
    const db=client.db("bitlinks")
    const collection=db.collection("url")

    if (!body.url || !body.shorturl) {
            return NextResponse.json({
                success: false,
                message: 'URL and short URL are required.'
            }, { status: 400 });
        }
        
    const doc=await collection.findOne({shorturl:body.shorturl})
    if(doc){
        return Response.json({success:false, error:true, message:'URL already exists'
     })
    }
    await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl
    });

    return NextResponse.json({
        success: true,
        message: 'URL generated successfully'
    });
   }