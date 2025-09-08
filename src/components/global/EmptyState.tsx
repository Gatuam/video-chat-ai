import Image from "next/image";

interface Props {
    title: string;
    description: string;
    image?: string
};

export const EmptyState = ({
    title,
    description,
    image='/empty.sng'
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center  gap-y-6 ">
            <Image className=" animate-pulse" src={image} alt="Empty" width={240} height={240} />
            <div className="flex flex-col max-w-md mx-auto text-center gap-y-2">
                <h6 className="text-2xl font-medium">{title}</h6>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
};
