/**
 * Lifestyle-based matching algorithm for roommate compatibility
 * Calculates compatibility scores between users based on their preferences
 */

/**
 * Calculate compatibility score between two users
 * @param {Object} user1 - First user with profile
 * @param {Object} user2 - Second user with profile
 * @returns {Object} - Compatibility score and breakdown
 */
exports.calculateCompatibility = (user1, user2) => {
  const scores = {
    lifestyle: 0,
    budget: 0,
    location: 0,
    timing: 0
  };
  
  let totalWeight = 0;
  
  // Lifestyle compatibility (40% weight)
  if (user1.profile?.lifestyle && user2.profile?.lifestyle) {
    const lifestyleScore = calculateLifestyleScore(
      user1.profile.lifestyle,
      user2.profile.lifestyle
    );
    scores.lifestyle = lifestyleScore;
    totalWeight += 40;
  }
  
  // Budget compatibility (25% weight)
  if (user1.profile?.housingPreferences?.budgetRange && 
      user2.profile?.housingPreferences?.budgetRange) {
    const budgetScore = calculateBudgetScore(
      user1.profile.housingPreferences.budgetRange,
      user2.profile.housingPreferences.budgetRange
    );
    scores.budget = budgetScore;
    totalWeight += 25;
  }
  
  // Location compatibility (20% weight)
  if (user1.profile?.housingPreferences?.location && 
      user2.profile?.housingPreferences?.location) {
    const locationScore = calculateLocationScore(
      user1.profile.housingPreferences.location,
      user2.profile.housingPreferences.location
    );
    scores.location = locationScore;
    totalWeight += 20;
  }
  
  // Timing compatibility (15% weight)
  if (user1.profile?.housingPreferences?.moveInDate && 
      user2.profile?.housingPreferences?.moveInDate) {
    const timingScore = calculateTimingScore(
      user1.profile.housingPreferences.moveInDate,
      user2.profile.housingPreferences.moveInDate
    );
    scores.timing = timingScore;
    totalWeight += 15;
  }
  
  // Calculate weighted total score
  const totalScore = (
    (scores.lifestyle * 40) +
    (scores.budget * 25) +
    (scores.location * 20) +
    (scores.timing * 15)
  ) / totalWeight;
  
  return {
    compatibilityScore: Math.round(totalScore),
    compatibilityFactors: scores
  };
};

/**
 * Calculate lifestyle compatibility score
 */
function calculateLifestyleScore(lifestyle1, lifestyle2) {
  let matches = 0;
  let total = 0;
  
  // Sleep schedule compatibility
  if (lifestyle1.sleepSchedule && lifestyle2.sleepSchedule) {
    total++;
    if (lifestyle1.sleepSchedule === lifestyle2.sleepSchedule) {
      matches += 1;
    } else if (lifestyle1.sleepSchedule === 'flexible' || 
               lifestyle2.sleepSchedule === 'flexible') {
      matches += 0.7;
    } else {
      matches += 0.3;
    }
  }
  
  // Cleanliness compatibility
  if (lifestyle1.cleanliness && lifestyle2.cleanliness) {
    total++;
    if (lifestyle1.cleanliness === lifestyle2.cleanliness) {
      matches += 1;
    } else {
      const cleanLevels = ['relaxed', 'moderately-clean', 'very-clean'];
      const diff = Math.abs(
        cleanLevels.indexOf(lifestyle1.cleanliness) - 
        cleanLevels.indexOf(lifestyle2.cleanliness)
      );
      matches += (1 - (diff * 0.3));
    }
  }
  
  // Social level compatibility
  if (lifestyle1.socialLevel && lifestyle2.socialLevel) {
    total++;
    if (lifestyle1.socialLevel === lifestyle2.socialLevel) {
      matches += 1;
    } else {
      matches += 0.5;
    }
  }
  
  // Guest frequency compatibility
  if (lifestyle1.guests && lifestyle2.guests) {
    total++;
    if (lifestyle1.guests === lifestyle2.guests) {
      matches += 1;
    } else {
      const guestLevels = ['never', 'rarely', 'occasionally', 'frequently'];
      const diff = Math.abs(
        guestLevels.indexOf(lifestyle1.guests) - 
        guestLevels.indexOf(lifestyle2.guests)
      );
      matches += (1 - (diff * 0.25));
    }
  }
  
  // Smoking compatibility (critical match)
  if (lifestyle1.smoking !== undefined && lifestyle2.smoking !== undefined) {
    total++;
    if (lifestyle1.smoking === lifestyle2.smoking) {
      matches += 1;
    } else {
      matches += 0; // No smoking preference match is a critical factor
    }
  }
  
  // Pets compatibility (critical match)
  if (lifestyle1.pets !== undefined && lifestyle2.pets !== undefined) {
    total++;
    if (lifestyle1.pets === lifestyle2.pets) {
      matches += 1;
    } else if (!lifestyle1.pets || !lifestyle2.pets) {
      matches += 0.3; // One doesn't have pets, might be acceptable
    } else {
      matches += 0;
    }
  }
  
  return total > 0 ? (matches / total) * 100 : 50;
}

/**
 * Calculate budget compatibility score
 */
function calculateBudgetScore(budget1, budget2) {
  if (!budget1.min || !budget1.max || !budget2.min || !budget2.max) {
    return 50;
  }
  
  // Check for overlap
  const overlapMin = Math.max(budget1.min, budget2.min);
  const overlapMax = Math.min(budget1.max, budget2.max);
  
  if (overlapMin > overlapMax) {
    // No overlap
    const gap = overlapMin - overlapMax;
    const avgBudget = (budget1.max + budget2.max) / 2;
    const gapPercent = gap / avgBudget;
    return Math.max(0, 100 - (gapPercent * 100));
  }
  
  // Calculate overlap percentage
  const overlap = overlapMax - overlapMin;
  const range1 = budget1.max - budget1.min;
  const range2 = budget2.max - budget2.min;
  const avgRange = (range1 + range2) / 2;
  
  const overlapPercent = overlap / avgRange;
  return Math.min(100, overlapPercent * 100);
}

/**
 * Calculate location compatibility score
 */
function calculateLocationScore(location1, location2) {
  let score = 0;
  
  // City match (most important)
  if (location1.city && location2.city) {
    if (location1.city.toLowerCase() === location2.city.toLowerCase()) {
      score += 60;
      
      // Neighborhood match (bonus)
      if (location1.neighborhood && location2.neighborhood) {
        if (location1.neighborhood.toLowerCase() === 
            location2.neighborhood.toLowerCase()) {
          score += 40;
        } else {
          score += 20;
        }
      } else {
        score += 20;
      }
    } else {
      // Different cities
      // Check if same state
      if (location1.state && location2.state && 
          location1.state.toLowerCase() === location2.state.toLowerCase()) {
        score += 20;
      }
    }
  }
  
  return score;
}

/**
 * Calculate timing compatibility score
 */
function calculateTimingScore(moveInDate1, moveInDate2) {
  const date1 = new Date(moveInDate1);
  const date2 = new Date(moveInDate2);
  
  const diffDays = Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
  
  if (diffDays <= 7) {
    return 100;
  } else if (diffDays <= 14) {
    return 90;
  } else if (diffDays <= 30) {
    return 75;
  } else if (diffDays <= 60) {
    return 50;
  } else if (diffDays <= 90) {
    return 25;
  } else {
    return 0;
  }
}

/**
 * Filter potential matches based on minimum compatibility
 * @param {Array} users - Array of users to match against
 * @param {Object} currentUser - Current user
 * @param {Number} minScore - Minimum compatibility score (default: 60)
 * @returns {Array} - Filtered and sorted array of compatible users
 */
exports.findCompatibleUsers = (users, currentUser, minScore = 60) => {
  const matches = users
    .filter(user => user._id.toString() !== currentUser._id.toString())
    .map(user => {
      const compatibility = exports.calculateCompatibility(currentUser, user);
      return {
        user,
        ...compatibility
      };
    })
    .filter(match => match.compatibilityScore >= minScore)
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  
  return matches;
};
