import { HourData } from '@mauriciorobayo/pyptron';
import styles from './hour.module.scss';

function convert24toAMPM(hour24: string) {
  if (hour24 === '12:00') return `${hour24}m.`;
  const [hours, minutes] = hour24.split(':');
  const hoursNumber = parseInt(hours, 10);
  if (hoursNumber === 12) return `${hour24}pm`;
  return hoursNumber > 12
    ? `${hoursNumber - 12}:${minutes}pm`
    : `${hoursNumber}:${minutes}am`;
}

function isEmptyArray(array: [string, string] | []): array is [] {
  return array.length === 0;
}

type HourProps = {
  hourData: HourData;
};

export default function Hour({ hourData: { hours, comment } }: HourProps) {
  const ALL_DAY = 'Todo el día';
  const hasComment = comment !== '';
  const isAllDay = comment === ALL_DAY;

  return (
    <div>
      {hasComment && !isAllDay ? <div>{comment}</div> : null}
      <ul className={styles.hours}>
        {hours.map((hour) => {
          if (isAllDay) {
            return <li className={styles.hour}>{ALL_DAY}</li>;
          }

          if (isEmptyArray(hour)) {
            return null;
          }

          return (
            <li key={JSON.stringify(hour)} className={styles.hour}>
              <span>
                {hour.map((hour24) => convert24toAMPM(hour24)).join(' a ')}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}