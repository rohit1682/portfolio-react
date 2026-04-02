/**
 * ModernCV — Contemporary single-column resume
 * Identity: full-height purple left accent strip, pill-shaped section titles,
 * timeline-dot entries, colored skill tags, gradient-feel header.
 */
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const col = {
  strip: "#5c35d4",
  stripLight: "#ede9fb",
  header: "#1a0a3d",
  accent: "#5c35d4",
  accentMid: "#7c5ce8",
  text: "#1a1a1a",
  muted: "#4a4a4a",
  light: "#888",
  white: "#fff",
  bg: "#fafafa",
  tagBg: "#ede9fb",
  tagBorder: "#c4b5f4",
  certBg: "#f3f0ff",
};

const STRIP_W = 5;
const PROJECTS = ["Energy-X", "DoConnect", "CvGenie"];

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: col.text,
    backgroundColor: col.bg,
    flexDirection: "row",
    paddingTop: 0,
    paddingBottom: 0,
  },
  // Left accent strip
  strip: { width: STRIP_W, backgroundColor: col.strip },
  // Main content
  content: { flex: 1, paddingTop: 0, paddingBottom: 30, paddingHorizontal: 0 },
  // Header band
  headerBand: {
    backgroundColor: col.header,
    paddingHorizontal: 32,
    paddingTop: 22,
    paddingBottom: 16,
    marginBottom: 0,
  },
  name: { fontSize: 21, fontFamily: "Helvetica-Bold", color: col.white, letterSpacing: 0.5, marginBottom: 2 },
  jobTitle: { fontSize: 10, color: "#b39ddb", fontFamily: "Helvetica-Bold", marginBottom: 6 },
  contactRow: { flexDirection: "row", flexWrap: "wrap" },
  contactItem: { fontSize: 8, color: "#c5b8e8", marginRight: 12 },
  link: { fontSize: 8, color: "#b39ddb", marginRight: 12 },
  // Body
  body: { paddingHorizontal: 32, paddingTop: 12 },
  section: { marginBottom: 9 },
  // Pill section title
  secTitleWrap: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  secTitlePill: {
    backgroundColor: col.strip,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 6,
  },
  secTitleText: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: col.white, textTransform: "uppercase", letterSpacing: 1.2 },
  secTitleLine: { flex: 1, borderBottomWidth: 0.5, borderBottomColor: "#d0c8f0" },
  // Timeline entry
  entry: { flexDirection: "row", marginBottom: 7 },
  timelineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: col.strip, marginTop: 1.5, marginRight: 8, flexShrink: 0 },
  timelineLine: { width: 1, backgroundColor: "#d0c8f0", marginRight: 7, flexShrink: 0 },
  entryContent: { flex: 1 },
  entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
  entryTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: col.text, flex: 1 },
  entryPeriod: { fontSize: 7.5, color: col.light, fontFamily: "Helvetica-Oblique", flexShrink: 0, marginLeft: 6 },
  entrySubtitle: { fontSize: 8, color: col.accentMid, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  entryMeta: { fontSize: 7.5, color: col.light },
  entryDesc: { fontSize: 8, color: col.muted, lineHeight: 1.4, marginBottom: 1 },
  // Bullets
  bullet: { flexDirection: "row", marginBottom: 1.5, paddingLeft: 2 },
  dot: { fontSize: 8, color: col.accentMid, marginRight: 4 },
  bulletText: { fontSize: 8, color: col.muted, flex: 1, lineHeight: 1.35 },
  // Summary
  summary: { fontSize: 8.5, color: col.muted, lineHeight: 1.5 },
  // Skills — colored pill tags
  skillCat: { fontSize: 8, fontFamily: "Helvetica-Bold", color: col.accent, marginBottom: 2, marginTop: 3 },
  skillRow: { flexDirection: "row", flexWrap: "wrap", gap: 3 },
  skillTag: {
    fontSize: 7.5, color: col.accent, backgroundColor: col.tagBg,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10,
    borderWidth: 0.5, borderColor: col.tagBorder, marginBottom: 2,
  },
  certRow: { flexDirection: "row", flexWrap: "wrap", gap: 3 },
  certTag: {
    fontSize: 7.5, color: col.muted, backgroundColor: col.certBg,
    paddingHorizontal: 5, paddingVertical: 1.5, borderRadius: 3, marginBottom: 2,
  },
});

function SecTitle({ children }) {
  return (
    <View style={s.secTitleWrap}>
      <View style={s.secTitlePill}>
        <Text style={s.secTitleText}>{children}</Text>
      </View>
      <View style={s.secTitleLine} />
    </View>
  );
}

// Entry with a timeline dot (no connecting line — avoids height issues in react-pdf)
function TimelineEntry({ children }) {
  return (
    <View style={s.entry}>
      <View style={s.timelineDot} />
      <View style={s.entryContent}>{children}</View>
    </View>
  );
}

function ExpEntry({ exp }) {
  return (
    <TimelineEntry>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{exp.role}</Text>
        <Text style={s.entryPeriod}>{exp.period}</Text>
      </View>
      <Text style={s.entrySubtitle}>{exp.company} · {exp.location} · {exp.type}</Text>
      {exp.points.map((p, j) => (
        <View key={j} style={s.bullet}>
          <Text style={s.dot}>▸</Text>
          <Text style={s.bulletText}>{p}</Text>
        </View>
      ))}
    </TimelineEntry>
  );
}

function EduEntry({ edu }) {
  return (
    <TimelineEntry>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{edu.degree}</Text>
        <Text style={s.entryPeriod}>{edu.period}</Text>
      </View>
      <Text style={s.entrySubtitle}>{edu.institution} · {edu.location}</Text>
      <Text style={s.entryMeta}>Score: {edu.score}{edu.description ? ` — ${edu.description}` : ""}</Text>
    </TimelineEntry>
  );
}

function ProjEntry({ proj }) {
  return (
    <TimelineEntry>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{proj.title} — {proj.subtitle}</Text>
        <Text style={s.entryPeriod}>{proj.status}</Text>
      </View>
      <Text style={s.entryDesc}>{proj.description}</Text>
      <Text style={s.entryMeta}>Stack: {proj.tags.join(", ")}</Text>
    </TimelineEntry>
  );
}

function VolEntry({ v }) {
  return (
    <TimelineEntry>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{v.role} · {v.organization}</Text>
        <Text style={s.entryPeriod}>{v.period}</Text>
      </View>
      <Text style={s.entryDesc}>{v.description}</Text>
    </TimelineEntry>
  );
}

export default function ModernCV({ data }) {
  const { personalInfo, experience, education, skillTags, achievements, certifications, projects, volunteer } = data;
  const cvProjects = projects.filter(p => PROJECTS.includes(p.title));

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.strip} />
        <View style={s.content}>
          {/* Header */}
          <View style={s.headerBand}>
            <Text style={s.name}>{personalInfo.name}</Text>
            <Text style={s.jobTitle}>{personalInfo.title}</Text>
            <View style={s.contactRow}>
              <Text style={s.contactItem}>{personalInfo.email}</Text>
              <Text style={s.contactItem}>{personalInfo.phone}</Text>
              <Text style={s.contactItem}>{personalInfo.location}</Text>
              <Link src={personalInfo.linkedin} style={s.link}>LinkedIn</Link>
              <Link src={personalInfo.github} style={s.link}>GitHub</Link>
            </View>
          </View>

          <View style={s.body}>
            {/* Summary */}
            <View style={s.section} wrap={false}>
              <SecTitle>Professional Summary</SecTitle>
              <Text style={s.summary}>{personalInfo.summary}</Text>
            </View>

            {/* Experience */}
            <View style={s.section}>
              <View wrap={false}>
                <SecTitle>Work Experience</SecTitle>
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

            {/* Skills */}
            <View style={s.section}>
              <View wrap={false}>
                <SecTitle>Technical Skills</SecTitle>
                {Object.entries(skillTags).slice(0, 1).map(([cat, items]) => (
                  <View key={cat}>
                    <Text style={s.skillCat}>{cat}</Text>
                    <View style={s.skillRow}>{items.map(sk => <Text key={sk} style={s.skillTag}>{sk}</Text>)}</View>
                  </View>
                ))}
              </View>
              {Object.entries(skillTags).slice(1).map(([cat, items]) => (
                <View key={cat} wrap={false}>
                  <Text style={s.skillCat}>{cat}</Text>
                  <View style={s.skillRow}>{items.map(sk => <Text key={sk} style={s.skillTag}>{sk}</Text>)}</View>
                </View>
              ))}
            </View>

            {/* Projects */}
            <View style={s.section}>
              <View wrap={false}>
                <SecTitle>Key Projects</SecTitle>
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
                    <Text style={s.dot}>▸</Text>
                    <Text style={s.bulletText}>{a.title}</Text>
                  </View>
                ))}
              </View>
              {achievements.slice(2).map((a, i) => (
                <View key={i} style={s.bullet}>
                  <Text style={s.dot}>▸</Text>
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
          </View>
        </View>
      </Page>
    </Document>
  );
}
