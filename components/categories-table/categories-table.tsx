import { CategoryData } from '@mauriciorobayo/pyptron';
import Hours from '../hours/hours';
import LicensePlate from '../license-plate/license-plate';
import styles from './categories-table.module.scss';
import utilStyles from '../../styles/utils.module.scss';

enum Scheme {
  LastNumber,
  FirstNumber,
}

type CategoryTableProps = {
  categories: Record<string, CategoryData>;
};

function isPublicLicense(categoryName: string) {
  const lowerCaseName = categoryName.toLowerCase();
  return lowerCaseName === 'taxis' || lowerCaseName.includes('público');
}

const ALL_DIGITS = 'Todos';

function hasAllDigits(numbers: number[]) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((num) => numbers.includes(num));
}

function pypNumbersToString(numbers: number[]) {
  if (numbers.length === 0) {
    return 'No aplica';
  }

  if (hasAllDigits(numbers)) {
    return ALL_DIGITS;
  }

  return numbers.join('-');
}

export default function CategoriesTable({ categories }: CategoryTableProps) {
  const categoriesData = Object.values(categories);

  return (
    <div className={styles.categoryTable}>
      <h3 className={styles.title}>
        Se restringe la circulación de los siguientes vehículos
      </h3>
      {categoriesData.map(
        ({ name: categoryName, data: [{ numbers, scheme, hours }] }) => {
          const numbersString = pypNumbersToString(numbers);
          const allDigits = numbersString === ALL_DIGITS;
          const hasRestriction = numbers.length > 0;

          return (
            <article key={categoryName} className={styles.categoryRow}>
              <h4 className={styles.categoryTitle}>{categoryName}</h4>
              {hasRestriction ? (
                <div>
                  <h5>Horario</h5>
                  <Hours
                    className={utilStyles.mx_1}
                    hours={hours}
                    interactive
                  />
                </div>
              ) : null}
              <LicensePlate
                className={utilStyles.mt_1}
                numbers={numbersString}
                publicLicense={isPublicLicense(categoryName)}
                size="big"
              />
              {allDigits || !hasRestriction ? null : (
                <div>
                  {`${
                    scheme === Scheme.FirstNumber
                      ? 'Primer dígito'
                      : 'Último dígito'
                  } del número de la placa`}
                </div>
              )}
            </article>
          );
        }
      )}
    </div>
  );
}