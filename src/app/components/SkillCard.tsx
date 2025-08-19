import React from 'react'

export interface CardSkill {
    id: number;
    skillName: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const SkillCard = ({ skillName, level }: CardSkill) => {
    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Advanced':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Beginner':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getLevelIcon = (level: string) => {
        switch (level) {
            case 'Advanced':
                return '🚀';
            case 'Intermediate':
                return '⚡';
            case 'Beginner':
                return '🌱';
            default:
                return '📚';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {skillName}
                </h3>
                <span className="text-xl">{getLevelIcon(level)}</span>
            </div>

            <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(level)}`}>
                    {level}
                </span>

                {/* Progress bar visual */}
                <div className="flex space-x-1 ml-3">
                    {[1, 2, 3].map((dot) => (
                        <div
                            key={dot}
                            className={`w-2 h-2 rounded-full ${
                                (level === 'Advanced' && dot <= 3) ||
                                (level === 'Intermediate' && dot <= 2) ||
                                (level === 'Beginner' && dot <= 1)
                                    ? 'bg-current opacity-80'
                                    : 'bg-gray-300'
                            } ${getLevelColor(level).split(' ')[1]}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillCard;