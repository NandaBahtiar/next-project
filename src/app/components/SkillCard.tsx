import React from 'react'
export interface CardSkill{
    skillName:string;
    level:'Beginner'|'Intermediate'|'Advanced';
}

const SkillCard = ({skillName,level}:CardSkill) => {

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{skillName}</h2>
                <p>{level}</p>
            </div>
        </div>
    )
}
export default SkillCard
