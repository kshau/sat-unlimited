import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {

        const {selectedQuestionSubcats} = await request.json();

        const questionSubcat = selectedQuestionSubcats[Math.floor(Math.random()*selectedQuestionSubcats.length)];

        const res = await axios.get(`https://raw.githubusercontent.com/SAT-Unlimited/questions/main/${questionSubcat}.json`);
        const data = res.data;

        const question = data[Math.floor(Math.random()*data.length)];

        return NextResponse.json({ question }, { status: 200 });

    }

    catch (err) {
        return NextResponse.json({ status: "error", message: err }, { status: 500 });
    }

}