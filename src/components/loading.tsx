/**
 * Componente de Loading reutilizable según Apple HIG
 * 
 * Apple HIG: Los activity indicators deben ser claros, no distractivos,
 * usar colores del sistema y animaciones suaves. Para pantallas completas,
 * el spinner debe ser lo suficientemente grande para ser visible pero no
 * dominante.
 * 
 * @see https://developer.apple.com/design/human-interface-guidelines
 */

interface LoadingProps {
  /**
   * Tamaño del spinner
   * - 'sm': 16px (pequeño, para botones)
   * - 'md': 24px (mediano, para componentes pequeños)
   * - 'lg': 32px (grande, para secciones)
   * - 'xl': 48px (extra grande, para pantallas completas - por defecto)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Si es true, muestra el loading en pantalla completa
   * Si es false, muestra solo el spinner (útil para inline loading)
   */
  fullScreen?: boolean;
  
  /**
   * Texto descriptivo para accesibilidad
   */
  label?: string;
  
  /**
   * Clase CSS adicional para el contenedor
   */
  className?: string;
}

export function Loading({ 
  size = 'xl', 
  fullScreen = true,
  label = 'Cargando',
  className = ''
}: LoadingProps) {
  // Aplicar tanto la clase base como la clase de tamaño
  // La clase base es necesaria para que se apliquen los estilos CSS
  const sizeClass = `mac-activity-indicator mac-activity-indicator-${size}`;
  
  const spinner = (
    <div 
      className={sizeClass} 
      aria-label={label} 
      role="status"
      aria-live="polite"
    />
  );
  
  if (!fullScreen) {
    return <div className={className}>{spinner}</div>;
  }
  
  return (
    <div className={`min-h-screen mac-bg-grouped flex items-center justify-center ${className}`}>
      {spinner}
    </div>
  );
}
