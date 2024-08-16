"use client"

import { Footer } from "@/components/Footer"
import { SelectPageHeader } from "@/components/SelectPageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpenTextIcon, CalculatorIcon, ChevronLeftIcon, ChevronRightIcon, Clock4Icon, FileTextIcon } from "lucide-react"
import { useState } from "react"

const questionCategories = [
  {
    "name": "Reading and Writing", 
    "iconElem": <BookOpenTextIcon size={60}/>,
    "subcats": [
      {
        "name": "Information and Ideas", 
        "id": "info_and_ideas"
      }, 
      {
        "name": "Craft and Structure", 
        "id": "craft_and_structure"
      }, 
      {
        "name": "Expression of Ideas", 
        "id": "expression_of_ideas"
      }, 
      {
        "name": "Standard English Conventions", 
        "id": "standard_english_conventions"
      }
    ]
  }, 
  {
    "name": "Math", 
    "iconElem": <CalculatorIcon size={60}/>,
    "subcats": [
      {
        "name": "Algebra", 
        "id": "algebra"
      }, 
      {
        "name": "Advanced Math", 
        "id": "advanced_math"
      }, 
      {
        "name": "Problem-Solving and Data Analysis", 
        "id": "problem_solving_and_data_analysis"
      }, 
      {
        "name": "Geometry and Trigonometry", 
        "id": "geometry_and_trigonometry"
      }
    ]
  }
]

const limitIntegerToRange = (int, min, max) => {

  var newInt = int;
  
  if (int < min) {
    newInt = min;
  }

  else if (int > max) {
    newInt = max;
  }

  return parseInt(newInt);

}

export default function Home() {

  const [key, setKey] = useState(0);
  const [formPage, setFormPage] = useState(0);

  const [selectedQuestionSubcats, setSelectedQuestionSubcats] = useState([]);
  const [selectedStudyMethod, setSelectedStudyMethod] = useState(null);

  const [selectedMinutes, setSelectedMinutes] = useState(15);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(20);

  localStorage.clear();

  const toggleSelectedSubcat = (subcatId) => {
    
    if (selectedQuestionSubcats.includes(subcatId)) {
      setSelectedQuestionSubcats(o => (o.filter(selectedSubcatId => (selectedSubcatId != subcatId))));
    }

    else {
      setSelectedQuestionSubcats(o => [...o, subcatId]);
    }

  }

  const changeFormPage = (value) => {
    setFormPage(o => o + value);
    setKey(o => o + 1);
    window.scrollTo({"top": 0});
  }

  const redirectToPlayPage = () => {

    localStorage.setItem("selectedStudyMethod", selectedStudyMethod);
    localStorage.setItem("selectedQuestionSubcats", JSON.stringify(selectedQuestionSubcats));
    localStorage.setItem("selectedMinutes", limitIntegerToRange(selectedMinutes, 1, 120));
    localStorage.setItem("selectedQuestionCount", limitIntegerToRange(selectedQuestionCount, 5, 200));

    location.href = "/play";

  }

  switch (formPage) {

    case 0:

      return (

        <div className="flex flex-col animate-fade-in" key={key}>
    
          <SelectPageHeader subheader="What would you like to study?"/>
    
          <div className="flex flex-col w-fit self-center">
    
            <div className="flex flex-wrap self-center mt-20 gap-x-36 gap-y-12 justify-center">
              {questionCategories.map(category => (
                <div className="flex flex-col items-center w-96 ">
                  {category.iconElem}
                  <span className="text-3xl font-bold mt-2">
                    {category.name}
                  </span>
                  <div className="flex flex-col mt-6 gap-y-4">
                    {category.subcats.map(subcat => (
                      <Button variant="outline" className={`w-86 ${selectedQuestionSubcats.includes(subcat.id) ? "bg-accent text-accent-foreground" : ""}`} onClick={() => {toggleSelectedSubcat(subcat.id)}}>
                        {subcat.name}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
    
            <div className="mt-10">
    
              <Button className="w-fit float-right m-3" onClick={() => {changeFormPage(1)}} disabled={selectedQuestionSubcats.length == 0}>
                <span>Next</span>
                <ChevronRightIcon/>
              </Button>
    
            </div>
    
          </div>

          <Footer/>
    
        </div>
    
      )

    case 1:

      return (

        <div className="flex flex-col animate-fade-in" key={key}>
    
          <SelectPageHeader subheader="How much would you like to study?"/>
    
          <div className="flex flex-col w-fit self-center">
    
            <div className="flex flex-wrap self-center mt-20 gap-x-36 gap-y-12 justify-center">
              <div className="flex flex-col items-center w-96 ">
                <Clock4Icon size={60}/>
                <span className="text-3xl font-bold mt-2">
                  Time-Based
                </span>
                <div className="flex flex-row mt-6 gap-x-4">
                  <Input type="number" min={1} max={120} step={1} className="w-20" defaultValue={selectedMinutes} onChange={(event) => {setSelectedMinutes(event.target.value)}}/>
                  <span className="my-auto text-2xl">Minutes</span>
                </div>
                <Button variant="outline" className={`mt-8 ${selectedStudyMethod == "time" ? "bg-accent text-accent-foreground" : ""}`} onClick={() => {setSelectedStudyMethod("time")}}>
                  {selectedStudyMethod == "time" ? "Selected" : "Select"}
                </Button>
              </div>
              <div className="flex flex-col items-center w-96 ">
                <FileTextIcon size={60}/>
                <span className="text-3xl font-bold mt-2">
                  Questions-Based
                </span>
                <div className="flex flex-row mt-6 gap-x-4">
                  <Input type="number" min={5} max={200} step={1} className="w-20" defaultValue={selectedQuestionCount} onChange={(event) => {setSelectedQuestionCount(event.target.value)}}/>
                  <span className="my-auto text-2xl">Questions</span>
                </div>
                <Button variant="outline" className={`mt-8 ${selectedStudyMethod == "questions" ? "bg-accent text-accent-foreground" : ""}`} onClick={() => {setSelectedStudyMethod("questions")}}>
                  {selectedStudyMethod == "questions" ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
    
            <div className="mt-10">
    
              <Button className="w-fit m-3" onClick={() => {changeFormPage(-1)}}>
                <ChevronLeftIcon/>
                <span>Back</span>
              </Button>

              <Button className="w-fit m-3 float-right" onClick={redirectToPlayPage} disabled={selectedStudyMethod == null}>
                Start
              </Button>
    
            </div>
    
          </div>

          <Footer/>
    
        </div>
    
      )
  }

}