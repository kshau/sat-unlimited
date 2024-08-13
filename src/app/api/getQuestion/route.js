import { NextResponse } from "next/server";

export async function POST(request) {

    const question = {
        "passage": "In 1534 CE, King Henry VIII of England split with the Catholic Church and declared himself head of the Church of England, in part because Pope Clement VII refused to annul his marriage to Catherine of Aragon. Two years later, Henry VIII introduced a policy titled the Dissolution of the Monasteries that by 1540 had resulted in the closure of all Catholic monasteries in England and the confiscation of their estates. Some historians assert that the enactment of the policy was primarily motivated by perceived financial opportunities.", 
        "prompt": "Which quotation from a scholarly article best supports the assertion of the historians mentioned in the text?", 
        "answerChoices": [
            "\"At the time of the Dissolution of the Monasteries, about 2 percent of the adult male population of England were monks; by 1690, the proportion of the adult male population who were monks was less than 1 percent.\"", 
            "\"At the time of the Dissolution of the Monasteries, about 2 percent of the adult male population of England were monks; by 1690, the proportion of the adult male population who were monks was less than 1 percent.\"", 
            "\"At the time of the Dissolution of the Monasteries, about 2 percent of the adult male population of England were monks; by 1690, the proportion of the adult male population who were monks was less than 1 percent.\"", 
            "\"At the time of the Dissolution of the Monasteries, about 2 percent of the adult male population of England were monks; by 1690, the proportion of the adult male population who were monks was less than 1 percent.\""
        ], 
        "correctAnswerIndex": 1
    }

    return NextResponse.json({ question }, { status: 200 });

}