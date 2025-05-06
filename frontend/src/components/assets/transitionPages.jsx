import { LoadingAnim, MiniLoadingAnim } from "./anims";

export function Loading_floatingPanel () {
    return (
        <div className="loading-panel">
            <MiniLoadingAnim/>
            <style>{`
                .loading-panel {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    justify-content: start;
                    align-items: center;
                    padding: 25px;
                }
            `}</style>
        </div>
  );
};

export function LoadingScreen () {
    return (
        <div className="page-container flex-center">
        <LoadingAnim/>
        <style>{`
            .page-container {
                display: flex;
                flex-direction: column;
                flex: 1;
                height: 100%;
                justify-content: center;
                align-items: center;
            }
        `}</style>
    </div>
  );
}; export default LoadingScreen;