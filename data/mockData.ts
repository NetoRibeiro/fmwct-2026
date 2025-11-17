import type { Team, Stadium, Group, Match } from '../types';

export const getFlagEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export const teams: Team[] = [
  { name: 'Canada', code: 'CA' }, { name: 'Mexico', code: 'MX' }, { name: 'USA', code: 'US' },
  { name: 'Argentina', code: 'AR' }, { name: 'Brazil', code: 'BR' }, { name: 'England', code: 'GB-ENG' },
  { name: 'France', code: 'FR' }, { name: 'Germany', code: 'DE' }, { name: 'Spain', code: 'ES' },
  { name: 'Portugal', code: 'PT' }, { name: 'Netherlands', code: 'NL' }, { name: 'Belgium', code: 'BE' },
  { name: 'Croatia', code: 'HR' }, { name: 'Italy', code: 'IT' }, { name: 'Uruguay', code: 'UY' },
  { name: 'Colombia', code: 'CO' }, { name: 'Japan', code: 'JP' }, { name: 'South Korea', code: 'KR' },
  { name: 'Australia', code: 'AU' }, { name: 'Saudi Arabia', code: 'SA' }, { name: 'Iran', code: 'IR' },
  { name: 'Qatar', code: 'QA' }, { name: 'Senegal', code: 'SN' }, { name: 'Morocco', code: 'MA' },
  { name: 'Ghana', code: 'GH' }, { name: 'Cameroon', code: 'CM' }, { name: 'Nigeria', code: 'NG' },
  { name: 'Egypt', code: 'EG' }, { name: 'Switzerland', code: 'CH' }, { name: 'Denmark', code: 'DK' },
  { name: 'Sweden', code: 'SE' }, { name: 'Poland', code: 'PL' }, { name: 'Serbia', code: 'RS' },
  { name: 'Austria', code: 'AT' }, { name: 'Chile', code: 'CL' }, { name: 'Ecuador', code: 'EC' },
  { name: 'Peru', code: 'PE' }, { name: 'Venezuela', code: 'VE' }, { name: 'Paraguay', code: 'PY' },
  { name: 'Norway', code: 'NO' }, { name: 'Scotland', code: 'GB-SCT' }, { name: 'Wales', code: 'GB-WLS' },
  { name: 'Ireland', code: 'IE' }, { name: 'Turkey', code: 'TR' }, { name: 'Greece', code: 'GR' },
  { name: 'Russia', code: 'RU' }, { name: 'Ukraine', code: 'UA' }, { name: 'Ivory Coast', code: 'CI' },
];

export const stadiums: Stadium[] = [
  { name: 'BC Place', city: 'Vancouver', country: 'Canada', capacity: 54500, image: 'https://picsum.photos/seed/bcplace/600/400' },
  { name: 'BMO Field', city: 'Toronto', country: 'Canada', capacity: 45500, image: 'https://picsum.photos/seed/bmofield/600/400' },
  { name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', capacity: 87523, image: 'https://picsum.photos/seed/azteca/600/400' },
  { name: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', capacity: 53500, image: 'https://picsum.photos/seed/bbva/600/400' },
  { name: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', capacity: 48071, image: 'https://picsum.photos/seed/akron/600/400' },
  { name: 'MetLife Stadium', city: 'New York / New Jersey', country: 'USA', capacity: 82500, image: 'https://picsum.photos/seed/metlife/600/400' },
  { name: 'AT&T Stadium', city: 'Dallas', country: 'USA', capacity: 80000, image: 'https://picsum.photos/seed/att/600/400' },
  { name: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', capacity: 70240, image: 'https://picsum.photos/seed/sofi/600/400' },
  { name: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', capacity: 76416, image: 'https://picsum.photos/seed/arrowhead/600/400' },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', capacity: 71000, image: 'https://picsum.photos/seed/mercedes/600/400' },
  { name: 'NRG Stadium', city: 'Houston', country: 'USA', capacity: 72220, image: 'https://picsum.photos/seed/nrg/600/400' },
  { name: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', capacity: 69796, image: 'https://picsum.photos/seed/lincoln/600/400' },
  { name: 'Lumen Field', city: 'Seattle', country: 'USA', capacity: 69000, image: 'https://picsum.photos/seed/lumen/600/400' },
  { name: "Levi's Stadium", city: 'San Francisco Bay Area', country: 'USA', capacity: 68500, image: 'https://picsum.photos/seed/levis/600/400' },
  { name: 'Gillette Stadium', city: 'Boston', country: 'USA', capacity: 65878, image: 'https://picsum.photos/seed/gillette/600/400' },
  { name: 'Hard Rock Stadium', city: 'Miami', country: 'USA', capacity: 64767, image: 'https://picsum.photos/seed/hardrock/600/400' },
];

export const placeholderTeam: Team = { name: 'TBD', code: 'TBD' };

export const groups: Group[] = Array.from({ length: 12 }, (_, i) => ({
  name: `Group ${String.fromCharCode(65 + i)}`,
  teams: [placeholderTeam, placeholderTeam, placeholderTeam, placeholderTeam],
}));

const venueMap: { [key: string]: Stadium } = stadiums.reduce((acc, stadium) => {
    acc[stadium.city] = stadium;
    return acc;
}, {} as { [key: string]: Stadium });

const createMatch = (id: number, date: string, city: string): Match => {
    const stadium = venueMap[city];
    if (!stadium) {
        console.warn(`Could not find stadium for city: ${city}`);
    }
    return {
        id,
        group: 'TBD',
        teamA: placeholderTeam,
        teamB: placeholderTeam,
        date: new Date(date).toISOString(),
        stadium: stadium?.name || 'TBD Stadium',
        city: city,
        country: stadium?.country || 'TBD',
        scoreA: null,
        scoreB: null,
        status: 'scheduled',
    };
};

// Data based on user-provided Google Doc.
const scheduleData = [
    { id: 1, date: '2026-06-11', city: 'Mexico City' }, { id: 2, date: '2026-06-11', city: 'Guadalajara' },
    { id: 3, date: '2026-06-12', city: 'Toronto' }, { id: 4, date: '2026-06-12', city: 'Los Angeles' },
    { id: 5, date: '2026-06-13', city: 'Boston' }, { id: 6, date: '2026-06-13', city: 'Vancouver' }, { id: 7, date: '2026-06-13', city: 'New York / New Jersey' },
    { id: 8, date: '2026-06-14', city: 'Philadelphia' }, { id: 9, date: '2026-06-14', city: 'Houston' }, { id: 10, date: '2026-06-14', city: 'Dallas' },
    { id: 11, date: '2026-06-15', city: 'Miami' }, { id: 12, date: '2026-06-15', city: 'Atlanta' }, { id: 13, date: '2026-06-15', city: 'Seattle' }, { id: 14, date: '2026-06-15', city: 'San Francisco Bay Area' },
    { id: 15, date: '2026-06-16', city: 'Kansas City' }, { id: 16, date: '2026-06-16', city: 'New York / New Jersey' }, { id: 17, date: '2026-06-16', city: 'Boston' },
    { id: 18, date: '2026-06-17', city: 'Toronto' }, { id: 19, date: '2026-06-17', city: 'Mexico City' }, { id: 20, date: '2026-06-17', city: 'Dallas' },
    { id: 21, date: '2026-06-18', city: 'Atlanta' }, { id: 22, date: '2026-06-18', city: 'Los Angeles' }, { id: 23, date: '2026-06-18', city: 'Vancouver' }, { id: 24, date: '2026-06-18', city: 'Guadalajara' },
    { id: 25, date: '2026-06-19', city: 'Philadelphia' }, { id: 26, date: '2026-06-19', city: 'Boston' }, { id: 27, date: '2026-06-19', city: 'Toronto' }, { id: 28, date: '2026-06-19', city: 'Seattle' },
    { id: 29, date: '2026-06-20', city: 'Kansas City' }, { id: 30, date: '2026-06-20', city: 'Houston' }, { id: 31, date: '2026-06-20', city: 'Monterrey' }, { id: 32, date: '2026-06-20', city: 'New York / New Jersey' },
    { id: 33, date: '2026-06-21', city: 'Miami' }, { id: 34, date: '2026-06-21', city: 'Atlanta' }, { id: 35, date: '2026-06-21', city: 'Los Angeles' }, { id: 36, date: '2026-06-21', city: 'Vancouver' },
    { id: 37, date: '2026-06-22', city: 'Philadelphia' }, { id: 38, date: '2026-06-22', city: 'Dallas' }, { id: 39, date: '2026-06-22', city: 'San Francisco Bay Area' }, { id: 40, date: '2026-06-22', city: 'Seattle' },
    { id: 41, date: '2026-06-23', city: 'Boston' }, { id: 42, date: '2026-06-23', city: 'Toronto' }, { id: 43, date: '2026-06-23', city: 'Houston' }, { id: 44, date: '2026-06-23', city: 'Guadalajara' },
    { id: 45, date: '2026-06-24', city: 'Miami' }, { id: 46, date: '2026-06-24', city: 'Atlanta' }, { id: 47, date: '2026-06-24', city: 'Vancouver' }, { id: 48, date: '2026-06-24', city: 'Mexico City' }, { id: 49, date: '2026-06-24', city: 'Monterrey' },
    { id: 50, date: '2026-06-25', city: 'Philadelphia' }, { id: 51, date: '2026-06-25', city: 'New York / New Jersey' }, { id: 52, date: '2026-06-25', city: 'Dallas' }, { id: 53, date: '2026-06-25', city: 'Kansas City' }, { id: 54, date: '2026-06-25', city: 'Seattle' }, { id: 55, date: '2026-06-25', city: 'Los Angeles' },
    { id: 56, date: '2026-06-26', city: 'Boston' }, { id: 57, date: '2026-06-26', city: 'Toronto' }, { id: 58, date: '2026-06-26', city: 'Houston' }, { id: 59, date: '2026-06-26', city: 'San Francisco Bay Area' }, { id: 60, date: '2026-06-26', city: 'Vancouver' }, { id: 61, date: '2026-06-26', city: 'Guadalajara' },
    { id: 62, date: '2026-06-27', city: 'New York / New Jersey' }, { id: 63, date: '2026-06-27', city: 'Philadelphia' }, { id: 64, date: '2026-06-27', city: 'Kansas City' }, { id: 65, date: '2026-06-27', city: 'Dallas' }, { id: 66, date: '2026-06-27', city: 'Houston' }, { id: 67, date: '2026-06-27', city: 'Miami' }, { id: 68, date: '2026-06-27', city: 'Atlanta' }, { id: 69, date: '2026-06-27', city: 'Los Angeles' }, { id: 70, date: '2026-06-27', city: 'San Francisco Bay Area' }, { id: 71, date: '2026-06-27', city: 'Seattle' }, { id: 72, date: '2026-06-27', city: 'Mexico City' },
    { id: 73, date: '2026-06-29', city: 'Monterrey' },
    { id: 74, date: '2026-06-30', city: 'Mexico City' },
    { id: 75, date: '2026-07-01', city: 'San Francisco Bay Area' }, { id: 76, date: '2026-07-01', city: 'Seattle' },
    { id: 77, date: '2026-07-02', city: 'Toronto' }, { id: 78, date: '2026-07-02', city: 'Los Angeles' },
    { id: 79, date: '2026-07-03', city: 'Miami' }, { id: 80, date: '2026-07-03', city: 'Houston' },
    { id: 81, date: '2026-07-04', city: 'Philadelphia' }, { id: 82, date: '2026-07-04', city: 'Dallas' },
    { id: 83, date: '2026-07-05', city: 'New York / New Jersey' }, { id: 84, date: '2026-07-05', city: 'Mexico City' },
    { id: 85, date: '2026-07-06', city: 'Dallas' }, { id: 86, date: '2026-07-06', city: 'Seattle' },
    { id: 87, date: '2026-07-07', city: 'Atlanta' }, { id: 88, date: '2026-07-07', city: 'Vancouver' },
    { id: 89, date: '2026-07-09', city: 'Boston' }, { id: 90, date: '2026-07-09', city: 'Los Angeles' },
    { id: 91, date: '2026-07-10', city: 'Kansas City' }, { id: 92, date: '2026-07-10', city: 'Miami' },
    { id: 93, date: '2026-07-11', city: 'Kansas City' }, { id: 94, date: '2026-07-11', city: 'Boston' },
    { id: 95, date: '2026-07-12', city: 'Los Angeles' }, { id: 96, date: '2026-07-12', city: 'Miami' },
    { id: 97, date: '2026-07-14', city: 'Dallas' },
    { id: 98, date: '2026-07-15', city: 'Atlanta' },
    { id: 99, date: '2026-07-16', city: 'New York / New Jersey' }, { id: 100, date: '2026-07-16', city: 'Los Angeles' },
    { id: 101, date: '2026-07-18', city: 'Dallas' }, { id: 102, date: '2026-07-18', city: 'Atlanta' },
    { id: 103, date: '2026-07-18', city: 'Miami' }, // 3rd Place Play-off
    { id: 104, date: '2026-07-19', city: 'New York / New Jersey' } // Final
];

export const matches: Match[] = scheduleData.map(item => createMatch(item.id, item.date, item.city));
