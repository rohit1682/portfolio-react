/**
 * SidebarCV — Two-column layout
 * Sidebar (left, dark): Name, Title, Contact, Skills w/ bars, Tools, Education, Certifications, Interests
 * Main (right, white): Summary, Experience, Projects, Achievements, Volunteer
 * All content fits on one page — sidebar is fully packed.
 */
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const col = {
  sidebar: "#1e3a5f",
  sidebarDark: "#152d4a",
  sidebarText: "#e8f0f8",
  sidebarMuted: "#9ab3cc",
  sidebarAccent: "#4fc3f7",
  sidebarSecLine: "#2a4f7a",
  main: "#fff",
  text: "#1a1a1a",
  muted: "#4a4a4a",
  light: "#777",
  accent: "#1e3a5f",
  accentLight: "#e3edf7",
  border: "#d0dde8",
};

const PROJECTS = ["Energy-X", "DoConnect", "CvGenie"];
const PRIMARY_SKILLS = ["JavaScript", "Java", "React.js", "Node.js", "Express.js", "MongoDB", "MySQL", "Git & GitHub"];
const PRIMARY_LEVELS = { "JavaScript": 92, "Java": 88, "React.js": 88, "Node.js": 85, "Express.js": 85, "MongoDB": 80, "MySQL": 82, "Git & GitHub": 90 };

const s = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, flexDirection: "row", backgroundColor: col.main },

  // ── SIDEBAR ──
  sidebar: { width: 170, backgroundColor: col.sidebar, paddingTop: 22, paddingBottom: 22, paddingHorizontal: 13, flexShrink: 0 },
  sbName: { fontSize: 13, fontFamily: "Helvetica-Bold", color: col.sidebarText, marginBottom: 1, lineHeight: 1.2 },
  sbTitle: { fontSize: 7.5, color: col.sidebarAccent, fontFamily: "Helvetica-Bold", marginBottom: 10, lineHeight: 1.3 },
  sbSec: { marginBottom: 9 },
  sbSecTitle: {
    fontSize: 6.5, fontFamily: "Helvetica-Bold", color: col.sidebarAccent,
    textTransform: "uppercase", letterSpacing: 1.3,
    borderBottomWidth: 0.5, borderBottomColor: col.sidebarSecLine,
    paddingBottom: 2, marginBottom: 4,
  },
  sbItem: { fontSize: 7.5, color: col.sidebarMuted, marginBottom: 2.5, lineHeight: 1.35 },
  sbItemBold: { fontSize: 7.5, color: col.sidebarText, fontFamily: "Helvetica-Bold", marginBottom: 1 },
  sbLink: { fontSize: 7.5, color: col.sidebarAccent, marginBottom: 2.5 },
  // Skill bars
  skillBar: { marginBottom: 3.5 },
  skillBarLabel: { fontSize: 7, color: col.sidebarText, marginBottom: 1.5 },
  skillBarTrack: { height: 3, backgroundColor: col.sidebarDark, borderRadius: 2 },
  skillBarFill: { height: 3, backgroundColor: col.sidebarAccent, borderRadius: 2 },
  // Skill tags
  skillTagRow: { flexDirection: "row", flexWrap: "wrap" },
  skillTag: { fontSize: 6.5, color: col.sidebarText, backgroundColor: col.sidebarDark, paddingHorizontal: 4, paddingVertical: 1.5, borderRadius: 2, marginBottom: 2, marginRight: 2 },
  // Edu in sidebar
  sbEduEntry: { marginBottom: 5 },
  sbEduTitle: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: col.sidebarText, lineHeight: 1.3, marginBottom: 1 },
  sbEduSub: { fontSize: 7, color: col.sidebarMuted, lineHeight: 1.3 },
  // Cert tags in sidebar
  sbCertRow: { flexDirection: "row", flexWrap: "wrap" },
  sbCertTag: { fontSize: 6.5, color: col.sidebarMuted, backgroundColor: col.sidebarDark, paddingHorizontal: 4, paddingVertical: 1.5, borderRadius: 2, marginBottom: 2, marginRight: 2 },

  // ── MAIN ──
  main: { flex: 1, paddingTop: 22, paddingBottom: 22, paddingHorizontal: 18 },
  section: { marginBottom: 8 },
  secTitle: {
    fontSize: 8.5, fontFamily: "Helvetica-Bold", color: col.accent,
    textTransform: "uppercase", letterSpacing: 1.2,
    borderBottomWidth: 1, borderBottomColor: col.accent,
    paddingBottom: 2, marginBottom: 4,
  },
  entry: { marginBottom: 6 },
  entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
  entryTitle: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: col.text, flex: 1 },
  entryPeriod: { fontSize: 7, color: col.light, fontFamily: "Helvetica-Oblique", flexShrink: 0, marginLeft: 5 },
  entrySubtitle: { fontSize: 7.5, color: col.accent, fontFamily: "Helvetica-Bold", marginBottom: 1.5 },
  entryMeta: { fontSize: 7, color: col.light },
  entryDesc: { fontSize: 7.5, color: col.muted, lineHeight: 1.4, marginBottom: 1 },
  bullet: { flexDirection: "row", marginBottom: 1.5, paddingLeft: 3 },
  dot: { fontSize: 7.5, color: col.accent, marginRight: 3 },
  bulletText: { fontSize: 7.5, color: col.muted, flex: 1, lineHeight: 1.35 },
  summary: { fontSize: 8, color: col.muted, lineHeight: 1.5 },
  // Volunteer in main
  volEntry: { marginBottom: 5 },
});

const Dot = () => <Text style={s.dot}>•</Text>;

function ExpEntry({ exp }) {
  return (
    <View style={s.entry}>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{exp.role} — {exp.company}</Text>
        <Text style={s.entryPeriod}>{exp.period}</Text>
      </View>
      <Text style={s.entrySubtitle}>{exp.location} · {exp.type}</Text>
      {exp.points.map((p, j) => (
        <View key={j} style={s.bullet}><Dot /><Text style={s.bulletText}>{p}</Text></View>
      ))}
    </View>
  );
}

function ProjEntry({ proj }) {
  return (
    <View style={s.entry}>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{proj.title} — {proj.subtitle}</Text>
        <Text style={s.entryPeriod}>{proj.status}</Text>
      </View>
      <Text style={s.entryDesc}>{proj.description}</Text>
      <Text style={s.entryMeta}>Stack: {proj.tags.join(", ")}</Text>
    </View>
  );
}

export default function SidebarCV({ data }) {
  const { personalInfo, experience, education, skillTags, achievements, certifications, projects, volunteer } = data;
  const cvProjects = projects.filter(p => PROJECTS.includes(p.title));

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── SIDEBAR ── */}
        <View style={s.sidebar}>
          <Text style={s.sbName}>{personalInfo.name}</Text>
          <Text style={s.sbTitle}>{personalInfo.title}</Text>

          {/* Contact */}
          <View style={s.sbSec} wrap={false}>
            <Text style={s.sbSecTitle}>Contact</Text>
            <Text style={s.sbItem}>{personalInfo.email}</Text>
            <Text style={s.sbItem}>{personalInfo.phone}</Text>
            <Text style={s.sbItem}>{personalInfo.location}</Text>
            <Link src={personalInfo.linkedin} style={s.sbLink}>LinkedIn</Link>
            <Link src={personalInfo.github} style={s.sbLink}>GitHub</Link>
          </View>

          {/* Core Skills with bars */}
          <View style={s.sbSec} wrap={false}>
            <Text style={s.sbSecTitle}>Core Skills</Text>
            {PRIMARY_SKILLS.map(sk => (
              <View key={sk} style={s.skillBar}>
                <Text style={s.skillBarLabel}>{sk}</Text>
                <View style={s.skillBarTrack}>
                  <View style={[s.skillBarFill, { width: `${PRIMARY_LEVELS[sk]}%` }]} />
                </View>
              </View>
            ))}
          </View>

          {/* Tools & Cloud */}
          <View style={s.sbSec} wrap={false}>
            <Text style={s.sbSecTitle}>Tools & Cloud</Text>
            <View style={s.skillTagRow}>
              {(skillTags["Cloud & DevOps"] || []).concat(skillTags["Testing & Tools"] || []).map(sk => (
                <Text key={sk} style={s.skillTag}>{sk}</Text>
              ))}
            </View>
          </View>

          {/* Education in sidebar */}
          <View style={s.sbSec} wrap={false}>
            <Text style={s.sbSecTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={s.sbEduEntry}>
                <Text style={s.sbEduTitle}>{edu.degree}</Text>
                <Text style={s.sbEduSub}>{edu.institution}</Text>
                <Text style={s.sbEduSub}>{edu.period} · {edu.score}</Text>
              </View>
            ))}
          </View>

          {/* Certifications in sidebar */}
          <View style={s.sbSec} wrap={false}>
            <Text style={s.sbSecTitle}>Certifications</Text>
            <View style={s.sbCertRow}>
              {certifications.map((c, i) => (
                <Text key={i} style={s.sbCertTag}>{c.name}</Text>
              ))}
            </View>
          </View>

          {/* Languages */}
          <View style={s.sbSec} wrap={false}>
            <Text style={s.sbSecTitle}>Languages</Text>
            {(personalInfo.spokenLanguages || []).map((l, i) => (
              <Text key={i} style={s.sbItem}>{l}</Text>
            ))}
          </View>

          {/* Interests */}
          <View style={s.sbSec} wrap={false}>
            <Text style={s.sbSecTitle}>Interests</Text>
            <View style={s.skillTagRow}>
              {(personalInfo.interests || []).map((it, i) => (
                <Text key={i} style={s.skillTag}>{it}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* ── MAIN ── */}
        <View style={s.main}>
          {/* Summary */}
          <View style={s.section} wrap={false}>
            <Text style={s.secTitle}>Professional Summary</Text>
            <Text style={s.summary}>{personalInfo.summary}</Text>
          </View>

          {/* Experience */}
          <View style={s.section}>
            <View wrap={false}>
              <Text style={s.secTitle}>Work Experience</Text>
              <ExpEntry exp={experience[0]} />
            </View>
            {experience.slice(1).map((exp, i) => (
              <View key={i} wrap={false}><ExpEntry exp={exp} /></View>
            ))}
          </View>

          {/* Projects */}
          <View style={s.section}>
            <View wrap={false}>
              <Text style={s.secTitle}>Key Projects</Text>
              <ProjEntry proj={cvProjects[0]} />
            </View>
            {cvProjects.slice(1).map((proj, i) => (
              <View key={i} wrap={false}><ProjEntry proj={proj} /></View>
            ))}
          </View>

          {/* Achievements */}
          <View style={s.section}>
            <View wrap={false}>
              <Text style={s.secTitle}>Achievements</Text>
              {achievements.slice(0, 3).map((a, i) => (
                <View key={i} style={s.bullet}><Dot /><Text style={s.bulletText}>{a.title}</Text></View>
              ))}
            </View>
            {achievements.slice(3).map((a, i) => (
              <View key={i} style={s.bullet}><Dot /><Text style={s.bulletText}>{a.title}</Text></View>
            ))}
          </View>

          {/* Volunteer */}
          <View style={s.section}>
            <View wrap={false}>
              <Text style={s.secTitle}>Volunteer & Leadership</Text>
              {volunteer.map((v, i) => (
                <View key={i} style={s.volEntry} wrap={false}>
                  <View style={s.entryRow}>
                    <Text style={s.entryTitle}>{v.role} · {v.organization}</Text>
                    <Text style={s.entryPeriod}>{v.period}</Text>
                  </View>
                  <Text style={s.entryDesc}>{v.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
}
