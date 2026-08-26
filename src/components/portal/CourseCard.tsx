import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Course } from '@/lib/portal/types';

interface CourseCardProps {
  course: Course;
  onBook: (course: Course) => void;
}

const CourseCard = ({ course, onBook }: CourseCardProps) => {
  return (
    <div className="bg-card border border-border rounded-3xl p-6 flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
          {course.level}
        </span>
        <span className="text-right bg-secondary/10 rounded-xl px-3 py-1.5">
          <span className="block text-primary font-bold text-sm whitespace-nowrap">
            {course.price.toLocaleString()} RWF
            <span className="text-muted-foreground font-normal"> /class</span>
          </span>
          <span className="block text-[11px] text-secondary italic">Negotiable</span>
        </span>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">{course.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{course.description}</p>

      {/* Teacher */}
      <div className="flex items-center gap-3 pt-4 border-t border-border mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
          {course.teacherAvatarInitials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">{course.teacherName}</p>
          <p className="text-muted-foreground text-xs line-clamp-1">{course.teacherBio}</p>
        </div>
      </div>

      <Button onClick={() => onBook(course)} className="w-full">
        <CalendarPlus size={16} />
        Book a Class
      </Button>
    </div>
  );
};

export default CourseCard;
