export function getCollegeYear(roll: string): string {
    // Extract the year from the roll using regex to match the 4-digit year
    const yearMatch: RegExpMatchArray | null = roll.match(/\d{4}/);
  
    // Check if a valid year was found
    if (!yearMatch) {
      return 'Invalid roll number';
    }
  
    // Parse the year as an integer
    const year: number = parseInt(yearMatch[0], 10);
  
    // Get the current year
    const currentYear: number = new Date().getFullYear();
  
    // Calculate the year in college
    const yearInCollege: number = currentYear - year + 1;
  
    // Map the yearInCollege to appropriate year description
    switch (yearInCollege) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      case 4:
        return '4th';
      default:
        return 'Invalid year';
    }
  }