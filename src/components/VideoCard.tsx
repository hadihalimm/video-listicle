import { Play } from 'lucide-react';
import { VideoData } from './JsonInput';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from './ui/skeleton';

interface VideoCardProps {
  video: VideoData;
  onPlay: () => void;
}

const VideoCard = ({ video, onPlay }: VideoCardProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div className="w-80 lg:w-96" ref={ref}>
      {!inView ? (
        <div className="p-4 space-y-4">
          <Skeleton className="w-full h-40 rounded-sm" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-10 w-10 rounded-4xl" />
        </div>
      ) : (
        <Card className="flex flex-col justify-between h-[400px] ">
          <div className="flex flex-col gap-y-5">
            <CardContent>
              <img
                src={video.thumbnail}
                alt={video.title}
                loading="lazy"
                className="rounded-sm aspect-video object-contain w-full h-full"
              />
            </CardContent>
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {video.description}
              </CardDescription>
            </CardHeader>
          </div>
          <CardFooter className="flex justify-end">
            <Button onClick={onPlay} className="h-10 w-10 rounded-4xl">
              <Play className="size-6" strokeWidth={3} />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default VideoCard;
