/**
 * ClassicCV — Old-school single-column resume
 * Identity: centered name block, full-width double rule, ALL CAPS spaced section titles,
 * left accent bar on experience entries, no colored tags — pure black & white with subtle grey.
 */
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const col = {
  black: "#111111",
  dark: "#2a2a2a",
  mid: "#444444",
  muted: "#666666",
  light: "#999999",
  rule: "#333333",
  bg: "#ffffff",
  entryBar: "#333333",
  tagBg: "#f0f0f0",
  tagBorder: "#cccccc",
};

const PROJECTS = ["Energy-X", "DoConnect", "CvGenie"];

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: col.dark,
    backgroundColor: col.bg,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 44,
  },
  // Centered header block
  headerBlock: { alignItems: "center", marginBottom: 10 },
  name: { fontSize: 22, fontFamily: "Helvetica-Bold", color: col.black, letterSpacing: 3, textAlign: "center", marginBottom: 3 },
  jobTitle: { fontSize: 9, color: col.mid, letterSpacing: 2, textAlign: "center", marginBottom: 6, textTransform: "uppercase" },
  ruleDouble: { borderBottomWidth: 2.5, borderBottomColor: col.rule, width: "100%", marginBottom: 2 },
  ruleThin: { borderBottomWidth: 0.5, borderBottomColor: col.rule, width: "100%", marginBottom: 6 },
  contactRow: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap" },
  contactItem: { fontSize: 8, color: col.muted, marginHorizontal: 7 },
  contactSep: { fontSize: 8, color: col.light },
  link: { fontSize: 8, color: col.mid, marginHorizontal: 7 },
  // Section
  section: { marginBottom: 9 },
  secTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: col.black,
    textTransform: "uppercase",
    letterSpacing: 2.5,
    textAlign: "center",
    marginBottom: 2,
  },
  secRule: { borderBottomWidth: 1, borderBottomColor: col.rule, marginBottom: 5 },
  // Entry with left bar
  entry: { flexDirection: "row", marginBottom: 7 },
  entryBar: { width: 2.5, backgroundColor: col.entryBar, marginRight: 8, borderRadius: 1, flexShrink: 0 },
  entryContent: { flex: 1 },
  entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
  entryTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: col.black, flex: 1 },
  entryPeriod: { fontSize: 7.5, color: col.light, fontFamily: "Helvetica-Oblique", flexShrink: 0, marginLeft: 6 },
  entrySubtitle: { fontSize: 8, color: col.mid, marginBottom: 2 },
  entryMeta: { fontSize: 7.5, color: col.muted },
  entryDesc: { fontSize: 8, color: col.muted, lineHeight: 1.4, marginBottom: 1 },
  // Bullets — plain dash style
  bullet: { flexDirection: "row", marginBottom: 1.5 },
  dot: { fontSize: 8, color: col.mid, marginRight: 5, width: 8 },
  bulletText: { fontSize: 8, color: col.muted, flex: 1, lineHeight: 1.35 },
  // Summary — indented block
  summary: { fontSize: 8.5, color: col.muted, lineHeight: 1.55, paddingHorizontal: 8 },
  // Skills — inline comma-separated per category
  skillLine: { flexDirection: "row", marginBottom: 3, flexWrap: "wrap" },
  skillCatLabel: { fontSize: 8, fontFamily: "Helvetica-Bold", color: col.black, marginRight: 5 },
  skillValue: { fontSize: 8, color: col.muted },
  // Certs — inline list
  certRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  certTag: {
    fontSize: 7.5, color: col.muted, backgroundColor: col.tagBg,
    paddingHorizontal: 5, paddingVertical: 1.5, borderRadius: 2,
    borderWidth: 0.5, borderColor: col.tagBorder, marginBottom: 2,
  },
});

function SecTitle({ children }) {
  return (
    <View>
      <Text style={s.secTitle}>{children}</Text>
      <View style={s.secRule} />
    </View>
  );
}

function EntryWithBar({ children }) {
  return (
    <View style={s.entry}>
      <View style={s.entryBar} />
      <View style={s.entryContent}>{children}</View>
    </View>
  );
}

function ExpEntry({ exp }) {
  return (
    <EntryWithBar>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{exp.role}</Text>
        <Text style={s.entryPeriod}>{exp.period}</Text>
      </View>
      <Text style={s.entrySubtitle}>{exp.company} · {exp.location} · {exp.type}</Text>
      {exp.points.map((p, j) => (
        <View key={j} style={s.bullet}>
          <Text style={s.dot}>–</Text>
          <Text style={s.bulletText}>{p}</Text>
        </View>
      ))}
    </EntryWithBar>
  );
}

function EduEntry({ edu }) {
  return (
    <EntryWithBar>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{edu.degree}</Text>
        <Text style={s.entryPeriod}>{edu.period}</Text>
      </View>
      <Text style={s.entrySubtitle}>{edu.institution} · {edu.location}</Text>
      <Text style={s.entryMeta}>Score: {edu.score}{edu.description ? ` — ${edu.description}` : ""}</Text>
    </EntryWithBar>
  );
}

function ProjEntry({ proj }) {
  return (
    <EntryWithBar>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{proj.title} — {proj.subtitle}</Text>
        <Text style={s.entryPeriod}>{proj.status}</Text>
      </View>
      <Text style={s.entryDesc}>{proj.description}</Text>
      <Text style={s.entryMeta}>Stack: {proj.tags.join(", ")}</Text>
    </EntryWithBar>
  );
}

function VolEntry({ v }) {
  return (
    <EntryWithBar>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{v.role} · {v.organization}</Text>
        <Text style={s.entryPeriod}>{v.period}</Text>
      </View>
      <Text style={s.entryDesc}>{v.description}</Text>
    </EntryWithBar>
  );
}

export default function ClassicCV({ data }) {
  const { personalInfo, experience, education, skillTags, achievements, certifications, projects, volunteer } = data;
  const cvProjects = projects.filter(p => PROJECTS.includes(p.title));

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Centered header */}
        <View style={s.headerBlock}>
          <Text style={s.name}>{personalInfo.name.toUpperCase()}</Text>
          <Text style={s.jobTitle}>{personalInfo.title}</Text>
          <View style={s.ruleDouble} />
          <View style={s.ruleThin} />
          <View style={s.contactRow}>
            <Text style={s.contactItem}>{personalInfo.email}</Text>
            <Text style={s.contactSep}>·</Text>
            <Text style={s.contactItem}>{personalInfo.phone}</Text>
            <Text style={s.contactSep}>·</Text>
            <Text style={s.contactItem}>{personalInfo.location}</Text>
            <Text style={s.contactSep}>·</Text>
            <Link src={personalInfo.linkedin} style={s.link}>LinkedIn</Link>
            <Text style={s.contactSep}>·</Text>
            <Link src={personalInfo.github} style={s.link}>GitHub</Link>
          </View>
        </View>

        {/* Summary */}
        <View style={s.section} wrap={false}>
          <SecTitle>Summary</SecTitle>
          <Text style={s.summary}>{personalInfo.summary}</Text>
        </View>

        {/* Experience */}
        <View style={s.section}>
          <View wrap={false}>
            <SecTitle>Experience</SecTitle>
            <ExpEntry exp={experience[0]} />
          </View>
          {experience.slice(1).map((exp, i) => (
            <View key={i} wrap={false}><ExpEntry exp={exp} /></View>
          ))}
        </View>

        {/* Education */}
        <View style={s.section}>
          <View wrap={false}>
            <SecTitle>Education</SecTitle>
            <EduEntry edu={education[0]} />
          </View>
          {education.slice(1).map((edu, i) => (
            <View key={i} wrap={false}><EduEntry edu={edu} /></View>
          ))}
        </View>

        {/* Skills — inline comma list per category */}
        <View style={s.section}>
          <View wrap={false}>
            <SecTitle>Technical Skills</SecTitle>
            {Object.entries(skillTags).slice(0, 1).map(([cat, items]) => (
              <View key={cat} style={s.skillLine}>
                <Text style={s.skillCatLabel}>{cat}:</Text>
                <Text style={s.skillValue}>{items.join(", ")}</Text>
              </View>
            ))}
          </View>
          {Object.entries(skillTags).slice(1).map(([cat, items]) => (
            <View key={cat} style={s.skillLine} wrap={false}>
              <Text style={s.skillCatLabel}>{cat}:</Text>
              <Text style={s.skillValue}>{items.join(", ")}</Text>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={s.section}>
          <View wrap={false}>
            <SecTitle>Projects</SecTitle>
            <ProjEntry proj={cvProjects[0]} />
          </View>
          {cvProjects.slice(1).map((proj, i) => (
            <View key={i} wrap={false}><ProjEntry proj={proj} /></View>
          ))}
        </View>

        {/* Achievements */}
        <View style={s.section}>
          <View wrap={false}>
            <SecTitle>Achievements</SecTitle>
            {achievements.slice(0, 2).map((a, i) => (
              <View key={i} style={s.bullet}>
                <Text style={s.dot}>–</Text>
                <Text style={s.bulletText}>{a.title}</Text>
              </View>
            ))}
          </View>
          {achievements.slice(2).map((a, i) => (
            <View key={i} style={s.bullet}>
              <Text style={s.dot}>–</Text>
              <Text style={s.bulletText}>{a.title}</Text>
            </View>
          ))}
        </View>

        {/* Certifications */}
        <View style={s.section} wrap={false}>
          <SecTitle>Certifications</SecTitle>
          <View style={s.certRow}>
            {certifications.map((c, i) => <Text key={i} style={s.certTag}>{c.name} — {c.issuer}</Text>)}
          </View>
        </View>

        {/* Volunteer */}
        <View style={s.section}>
          <View wrap={false}>
            <SecTitle>Volunteer & Leadership</SecTitle>
            <VolEntry v={volunteer[0]} />
          </View>
          {volunteer.slice(1).map((v, i) => (
            <View key={i} wrap={false}><VolEntry v={v} /></View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
