interface IconCounterConfig {
  icon: string;
  iconCounterId: string;
  extraIconClasses?: string; 
  containerId: string;
  initialValue: number;
  insert?: 'beforeend' | 'afterbegin';
  dataAttribute?: { key: string; value: string };
}