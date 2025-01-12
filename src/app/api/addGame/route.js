import db from "@/lib/firebaseClient";
import { ref, push } from "firebase/database";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const path = 'data'
    
    if (req.method !== "POST") {
        return NextResponse.json(
            { error: "Method not allowed" },
            { status: 405 }
        );
    }
        
    try {
        // Parse the request body
        const body = await req.json();
        const { data } = body;
        // const { data } = req.body;
        console.log(`req body: ${req.body}`)
        if (!data) {
            // return res.status(400).json({ error: "Missing 'path' or 'data' in request body" });
            return NextResponse.json(
                { error: "Missing 'data' in request body" },
                { status: 400 }
            )
        }
    
        // const ref = db.ref(path); // Reference to the specified path in the database
        const dataRef = ref(db, path);
        // await dataRef.push(data); // Push the data to the database
        await push(dataRef, data); // Use push() to add data
    
        // res.status(200).json({ message: "Data added successfully" });
        return NextResponse.json(
            { message: "Data added successfully" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error adding data to Firebase:", error);
        // res.status(500).json({ error: "Failed to add data to the database" });
        return NextResponse.json(
            { error: "Failed to add data to the database" },
            { status: 500 }
        )
        
    }

}