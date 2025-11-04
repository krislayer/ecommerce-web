export default function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="mac-card text-center p-mac-xl">
        <div className="flex flex-col items-center gap-mac-md">
          <div className="mac-activity-indicator-lg"></div>
          <p className="mac-text-body mac-text-secondary">Cargando...</p>
        </div>
      </div>
    </div>
  );
}

