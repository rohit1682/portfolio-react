import { describe, it, expect } from "vitest";
import {
  personalInfo, stats, skillCategories, skillTags,
  experience, education, volunteer, projects,
  achievements, certificates, certificateCategories,
  hobbies, navLinks,
} from "../index";

describe("personalInfo", () => {
  it("has all required fields", () => {
    expect(personalInfo.name).toBeTruthy();
    expect(personalInfo.email).toBeTruthy();
    expect(personalInfo.phone).toBeTruthy();
    expect(personalInfo.location).toBeTruthy();
    expect(personalInfo.github).toMatch(/^https?:\/\//);
    expect(personalInfo.linkedin).toMatch(/^https?:\/\//);
    expect(personalInfo.leetcode).toMatch(/^https?:\/\//);
    expect(personalInfo.typedRoles).toBeInstanceOf(Array);
    expect(personalInfo.typedRoles.length).toBeGreaterThan(0);
  });

  it("has data-driven fields (no hardcoding in components)", () => {
    expect(personalInfo.tagline).toBeTruthy();
    expect(personalInfo.degree).toBeTruthy();
    expect(personalInfo.status).toBeTruthy();
    expect(personalInfo.contactHeading).toBeTruthy();
    expect(personalInfo.contactDescription).toBeTruthy();
    expect(personalInfo.footerTagline).toBeTruthy();
  });

  it("has section titles", () => {
    expect(personalInfo.heroGreeting).toBeTruthy();
    expect(personalInfo.heroPrimaryCTA).toBeTruthy();
    expect(personalInfo.heroSecondaryCTA).toBeTruthy();
    expect(personalInfo.aboutTitle).toBeTruthy();
    expect(personalInfo.skillsTitle).toBeTruthy();
    expect(personalInfo.experienceTitle).toBeTruthy();
    expect(personalInfo.educationTitle).toBeTruthy();
    expect(personalInfo.projectsTitle).toBeTruthy();
    expect(personalInfo.achievementsTitle).toBeTruthy();
    expect(personalInfo.certificatesTitle).toBeTruthy();
    expect(personalInfo.hobbiesTitle).toBeTruthy();
    expect(personalInfo.contactTitle).toBeTruthy();
  });

  it("has UI labels and configuration", () => {
    expect(personalInfo.preloaderWords).toBeInstanceOf(Array);
    expect(personalInfo.preloaderWords.length).toBeGreaterThan(0);
    expect(personalInfo.skillsTabs.proficiency).toBeTruthy();
    expect(personalInfo.skillsTabs.all).toBeTruthy();
    expect(personalInfo.projectFilters.all).toBeTruthy();
    expect(personalInfo.projectFilters.featured).toBeTruthy();
    expect(personalInfo.projectFilters.more).toBeTruthy();
    expect(personalInfo.featuredLabel).toBeTruthy();
    expect(personalInfo.downloadCVLabel).toBeTruthy();
    expect(personalInfo.backToTopLabel).toBeTruthy();
    expect(personalInfo.contactTagline).toBeTruthy();
  });

  it("has section taglines", () => {
    expect(personalInfo.aboutTagline).toBeTruthy();
    expect(personalInfo.skillsTagline).toBeTruthy();
    expect(personalInfo.experienceTagline).toBeTruthy();
    expect(personalInfo.educationTagline).toBeTruthy();
    expect(personalInfo.projectsTagline).toBeTruthy();
    expect(personalInfo.achievementsTagline).toBeTruthy();
    expect(personalInfo.certificatesTagline).toBeTruthy();
    expect(personalInfo.hobbiesTagline).toBeTruthy();
  });

  it("has photos object", () => {
    expect(personalInfo.photos).toBeDefined();
    expect(personalInfo.photos.profile).toBeTruthy();
    expect(personalInfo.photos.intro).toBeTruthy();
  });
});

describe("stats", () => {
  it("is a non-empty array with required fields", () => {
    expect(stats).toBeInstanceOf(Array);
    expect(stats.length).toBeGreaterThan(0);
    stats.forEach((s) => {
      expect(s.label).toBeTruthy();
      expect(typeof s.value).toBe("number");
      expect(s.icon).toBeTruthy();
    });
  });
});

describe("skillCategories", () => {
  it("is a non-empty array of category objects", () => {
    expect(skillCategories).toBeInstanceOf(Array);
    expect(skillCategories.length).toBeGreaterThan(0);
    skillCategories.forEach((cat) => {
      expect(cat.category).toBeTruthy();
      expect(cat.items).toBeInstanceOf(Array);
      expect(cat.items.length).toBeGreaterThan(0);
      cat.items.forEach((item) => {
        expect(item.name).toBeTruthy();
        expect(typeof item.level).toBe("number");
      });
    });
  });
});

describe("skillTags", () => {
  it("is an object with string arrays", () => {
    expect(typeof skillTags).toBe("object");
    const keys = Object.keys(skillTags);
    expect(keys.length).toBeGreaterThan(0);
    keys.forEach((key) => {
      expect(skillTags[key]).toBeInstanceOf(Array);
      expect(skillTags[key].length).toBeGreaterThan(0);
    });
  });
});

describe("experience", () => {
  it("is a non-empty array with required fields", () => {
    expect(experience).toBeInstanceOf(Array);
    expect(experience.length).toBeGreaterThan(0);
    experience.forEach((e) => {
      expect(e.role).toBeTruthy();
      expect(e.company).toBeTruthy();
      expect(e.period).toBeTruthy();
      expect(e.points).toBeInstanceOf(Array);
    });
  });
});

describe("education", () => {
  it("is a non-empty array", () => {
    expect(education).toBeInstanceOf(Array);
    expect(education.length).toBeGreaterThan(0);
    education.forEach((e) => {
      expect(e.degree).toBeTruthy();
      expect(e.institution).toBeTruthy();
    });
  });
});

describe("volunteer", () => {
  it("is a non-empty array", () => {
    expect(volunteer).toBeInstanceOf(Array);
    expect(volunteer.length).toBeGreaterThan(0);
    volunteer.forEach((v) => {
      expect(v.role).toBeTruthy();
      expect(v.organization).toBeTruthy();
    });
  });
});

describe("projects", () => {
  it("is a non-empty array with required fields", () => {
    expect(projects).toBeInstanceOf(Array);
    expect(projects.length).toBeGreaterThan(0);
    projects.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.tags).toBeInstanceOf(Array);
    });
  });

  it("has at least one featured project", () => {
    expect(projects.some((p) => p.featured)).toBe(true);
  });
});

describe("achievements", () => {
  it("is a non-empty array", () => {
    expect(achievements).toBeInstanceOf(Array);
    expect(achievements.length).toBeGreaterThan(0);
    achievements.forEach((a) => {
      expect(a.title).toBeTruthy();
      expect(a.icon).toBeTruthy();
    });
  });
});

describe("certificates and certificateCategories", () => {
  it("certificates is a non-empty array", () => {
    expect(certificates).toBeInstanceOf(Array);
    expect(certificates.length).toBeGreaterThan(0);
    certificates.forEach((c) => {
      expect(c.title).toBeTruthy();
      expect(c.issuer).toBeTruthy();
      expect(c.file).toBeTruthy();
      expect(["pdf", "image"]).toContain(c.type);
    });
  });

  it("certificateCategories is an object", () => {
    expect(typeof certificateCategories).toBe("object");
    Object.values(certificateCategories).forEach((cat) => {
      expect(cat.label).toBeTruthy();
      expect(cat.color).toBeTruthy();
    });
  });
});

describe("hobbies", () => {
  it("is a non-empty array", () => {
    expect(hobbies).toBeInstanceOf(Array);
    expect(hobbies.length).toBeGreaterThan(0);
    hobbies.forEach((h) => {
      expect(h.name).toBeTruthy();
      expect(h.icon).toBeTruthy();
    });
  });
});

describe("navLinks", () => {
  it("is a non-empty array with href and label", () => {
    expect(navLinks).toBeInstanceOf(Array);
    expect(navLinks.length).toBeGreaterThan(0);
    navLinks.forEach((l) => {
      expect(l.href).toMatch(/^#/);
      expect(l.label).toBeTruthy();
    });
  });
});
