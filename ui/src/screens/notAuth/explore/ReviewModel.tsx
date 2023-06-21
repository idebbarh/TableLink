type ReviewModel = {
  closeModel: () => void;
};

function ReviewModel({ closeModel }: ReviewModel) {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-50 bg-blackOverlay"></div>
  );
}

export default ReviewModel;
