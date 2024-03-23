import Lottie from "lottie-react";
import loadinganimation from "../../../../../public/animations/loadinganimation.json";

interface ILoadingOverlayProps {
    isPending: boolean;
}

const LoadingOverlay: React.FC<ILoadingOverlayProps> = ({ isPending }) => {
    if(!isPending) {
        return null;
    }

    return(
         <>
           <div className="absolute top-0 left-0 z-50">
                <div className="flex fixed h-screen w-full fkex-col items-center backdrop-blur">
                    <Lottie animationData={loadinganimation} loop className="w-1/2 h-2/3 mx-auto" />
                </div>
            </div>
        </>
    )
}

export default LoadingOverlay;