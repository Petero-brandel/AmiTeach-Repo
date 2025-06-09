interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center gap-2 flex-1">
          <div
            className={`h-6 w-6 rounded-full flex items-center justify-center text-sm flex-shrink-0
              ${
                index + 1 === currentStep
                  ? "bg-primary text-white"
                  : index + 1 < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
          >
            {index + 1 < currentStep ? "✓" : index + 1}
          </div>
          {index + 1 < totalSteps && (
            <div
              className={`h-0.5 w-full ${
                index + 1 < currentStep ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
