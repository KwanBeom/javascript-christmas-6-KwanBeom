import BADGE from '../constants/badge';

class Membership {
  static badge(benefitAmount) {
    const badgeInfo = Object.entries(BADGE)
      .sort((nextBadgeData, currentBadgeData) => (
        currentBadgeData[1].BENEFIT_AMOUNT - nextBadgeData[1].BENEFIT_AMOUNT
      ))
      .find((badgeData) => badgeData[1].BENEFIT_AMOUNT <= benefitAmount);

    return badgeInfo && badgeInfo[1].NAME;
  }
}

export default Membership;
