import React from 'react';
import './GradeMark.css';
import type { Grade } from '../../data/types';

interface GradeMarkProps {
  grade: Grade;
  title?: string;
}

export const GradeMark = ({ grade, title }: GradeMarkProps) => {
  return (
    <span className="mz-grade-mark" title={title}>
      {grade}
    </span>
  );
};
