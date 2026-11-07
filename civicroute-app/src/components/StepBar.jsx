// Step progress indicator shared across pages 1-4
const STEPS = ['Location', 'Issue', 'Letter', 'Send'];

export default function StepBar({ currentStep, completedUpTo }) {
  // currentStep: 1-indexed (1=Location, 2=Issue, 3=Letter, 4=Send)
  // completedUpTo: how many steps are fully done
  return (
    <div className="px-5 py-3">
      <div className="relative flex items-center justify-between max-w-sm mx-auto">
        {/* Background track */}
        <div
          className="absolute top-[14px] left-[14px] right-[14px] h-[2px] z-0"
          style={{ background: '#e5e2dc' }}
        />
        {/* Filled track */}
        {completedUpTo > 0 && (
          <div
            className="absolute top-[14px] left-[14px] h-[2px] z-0 transition-all duration-500"
            style={{
              background: '#2d1e18',
              width: `${((completedUpTo) / (STEPS.length - 1)) * 100}%`,
            }}
          />
        )}
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum <= completedUpTo;
          const isActive = stepNum === currentStep;
          return (
            <div key={label} className="flex flex-col items-center gap-1 z-10">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-all duration-300"
                style={{
                  background: isCompleted || isActive ? '#2d1e18' : '#ebe8e2',
                  color: isCompleted || isActive ? '#ffffff' : '#4f4541',
                  boxShadow: isActive ? '0 0 0 4px rgba(45,30,24,0.12)' : undefined,
                }}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined" style={{ fontSize: 15, fontVariationSettings: "'FILL' 1" }}>check</span>
                ) : (
                  <span className="text-xs font-semibold">{stepNum}</span>
                )}
              </div>
              <span
                className="text-[11px] font-bold tracking-wide"
                style={{
                  color: isActive ? '#140804' : '#817470',
                  fontWeight: isActive ? 700 : 600,
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
