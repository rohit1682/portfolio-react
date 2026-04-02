import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const col = {
  primary: "#2d2d2d",
  accent: "#c0392b",
  accentLight: "#fdf0ef",
  text: "#1a1a1a",
  muted: "#4a4a4a",
  light: "#888",
  border: "#e0c8c6",
  bg: "#fff",
  headerBg: "#2d2d2d",
  headerText: "#fff",
};

const PROJECTS = ["Energy-X", "DoConnect", "CvGenie"];

const s = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, color: col.text, backgroundColor: col.bg, paddingTop: 0, paddingBottom: 28, paddingHorizontal: 0 },
  headerBand: { backgroundColor: col.headerBg, paddingHorizontal: 36, paddingTop: 20, paddingBottom: 14 },
  name: { fontSize: 20, fontFamily: "Helvetica-Bold", color: col.headerText, letterSpacing: 0.5, marginBottom: 2 },
  jobTitle: { fontSize: 10, color: "#e87c75", fontFamily: "Helvetica-Bold", marginBottom: 6 },
  contactRow: { flexDirection: "row", flexWrap: "wrap" },
  contactItem: { fontSize: 8, color: "#c0c0c0", marginRight: 12 },
  link: { fontSize: 8, color: "#e87c75", marginRight: 12 },
  body: { paddingHorizontal: 36, paddingTop: 12 },
  section: { marginBottom: 8 },
  secTitle: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: col.accent, textTransform: "uppercase", letterSpacing: 1.2, borderBottomWidth: 1, borderBottomColor: col.accent, paddingBottom: 2, marginBottom: 4 },
  entry: { marginBottom: 6 },
  entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
  entryTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: col.text, flex: 1 },
  entryPeriod: { fontSize: 7.5, color: col.light, fontFamily: "Helvetica-Oblique", flexShrink: 0, marginLeft: 5 },
  entrySubtitle: { fontSize: 8, color: col.accent, fontFamily: "Helvetica-Bold", marginBottom: 1.5 },
  entryMeta: { fontSize: 7.5, color: col.light },
  entryDesc: { fontSize: 8, color: col.muted, lineHeight: 1.4, marginBottom: 1 },
  bullet: { flexDirection: "row", marginBottom: 1.5, paddingLeft: 3 },
  dot: { fontSize: 8, color: col.accent, marginRight: 4 },
  bulletText: { fontSize: 8, color: col.muted, flex: 1, lineHeight: 1.35 },
  summary: { fontSize: 8.5, color: col.muted, lineHeight: 1.5 },
  skillCat: { fontSize: 8, fontFamily: "Helvetica-Bold", color: col.primary, marginBottom: 2, marginTop: 2 },
  skillRow: { flexDirection: "row", flexWrap: "wrap", gap: 3 },
  skillTag: { fontSize: 7.5, color: col.text, backgroundColor: col.accentLight, paddingHorizontal: 4, paddingVertical: 1.5, borderRadius: 2, borderWidth: 0.5, borderColor: col.border, marginBottom: 2 },
  certRow: { flexDirection: "row", flexWrap: "wrap", gap: 3 },
  certTag: { fontSize: 7.5, color: col.muted, backgroundColor: "#f5f5f5", paddingHorizontal: 4, paddingVertical: 1.5, borderRadius: 2, borderWidth: 0.5, borderColor: "#ddd", marginBottom: 2 },
});

const Dot = () => <Text style={s.dot}>–</Text>;

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

function EduEntry({ edu }) {
  return (
    <View style={s.entry}>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{edu.degree}</Text>
        <Text style={s.entryPeriod}>{edu.period}</Text>
      </View>
      <Text style={s.entrySubtitle}>{edu.institution} · {edu.location}</Text>
      <Text style={s.entryMeta}>Score: {edu.score}{edu.description ? ` — ${edu.description}` : ""}</Text>
    </View>
  );
}

function VolEntry({ v }) {
  return (
    <View style={s.entry}>
      <View style={s.entryRow}>
        <Text style={s.entryTitle}>{v.role} · {v.organization}</Text>
        <Text style={s.entryPeriod}>{v.period}</Text>
      </View>
      <Text style={s.entryDesc}>{v.description}</Text>
    </View>
  );
}

export default function CompactCV({ data }) {
  const { personalInfo, experience, education, skillTags, achievements, certifications, projects, volunteer } = data;
  const cvProjects = projects.filter(p => PROJECTS.includes(p.title));

  const skillEntries = Object.entries(skillTags);

  return (
    <Document>
      <Page size="A4" style={s.page}>
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
            <Text style={s.secTitle}>Professional Summary</Text>
            <Text style={s.summary}>{personalInfo.summary}</Text>
          </View>

          {/* Experience — full width */}
          <View style={s.section}>
            <View wrap={false}>
              <Text style={s.secTitle}>Work Experience</Text>
              <ExpEntry exp={experience[0]} />
            </View>
            {experience.slice(1).map((exp, i) => (
              <View key={i} wrap={false}><ExpEntry exp={exp} /></View>
            ))}
          </View>

          {/* Education — full width */}
          <View style={s.section}>
            <View wrap={false}>
              <Text style={s.secTitle}>Education</Text>
              <EduEntry edu={education[0]} />
            </View>
            {education.slice(1).map((edu, i) => (
              <View key={i} wrap={false}><EduEntry edu={edu} /></View>
            ))}
          </View>

          {/* Skills — single column, no flex row (two-col flex causes overlap in react-pdf) */}
          <View style={s.section}>
            <View wrap={false}>
              <Text style={s.secTitle}>Technical Skills</Text>
              {skillEntries.slice(0, 1).map(([cat, items]) => (
                <View key={cat}>
                  <Text style={s.skillCat}>{cat}</Text>
                  <View style={s.skillRow}>{items.map(sk => <Text key={sk} style={s.skillTag}>{sk}</Text>)}</View>
                </View>
              ))}
            </View>
            {skillEntries.slice(1).map(([cat, items]) => (
              <View key={cat} wrap={false}>
                <Text style={s.skillCat}>{cat}</Text>
                <View style={s.skillRow}>{items.map(sk => <Text key={sk} style={s.skillTag}>{sk}</Text>)}</View>
              </View>
            ))}
          </View>

          {/* Projects — each project is fully self-contained, no shared wrapper */}
          <View wrap={false} style={{ marginBottom: 2 }}>
            <Text style={s.secTitle}>Key Projects</Text>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: col.text, marginBottom: 1 }}>
              {cvProjects[0].title} — {cvProjects[0].subtitle}
            </Text>
            <Text style={{ fontSize: 8, color: col.accent, fontFamily: "Helvetica-Bold", marginBottom: 2 }}>
              {cvProjects[0].status}
            </Text>
            <Text style={{ fontSize: 8, color: col.muted, lineHeight: 1.4, marginBottom: 1 }}>
              {cvProjects[0].description}
            </Text>
            <Text style={{ fontSize: 7.5, color: col.light, marginBottom: 6 }}>
              Stack: {cvProjects[0].tags.join(", ")}
            </Text>
          </View>
          {cvProjects.slice(1).map((proj, i) => (
            <View key={i} wrap={false} style={{ marginBottom: 6 }}>
              <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: col.text, marginBottom: 1 }}>
                {proj.title} — {proj.subtitle}
              </Text>
              <Text style={{ fontSize: 8, color: col.accent, fontFamily: "Helvetica-Bold", marginBottom: 2 }}>
                {proj.status}
              </Text>
              <Text style={{ fontSize: 8, color: col.muted, lineHeight: 1.4, marginBottom: 1 }}>
                {proj.description}
              </Text>
              <Text style={{ fontSize: 7.5, color: col.light }}>
                Stack: {proj.tags.join(", ")}
              </Text>
            </View>
          ))}
          <View style={{ marginBottom: 6 }} />

          {/* Achievements */}
          <View style={s.section}>
            <View wrap={false}>
              <Text style={s.secTitle}>Achievements</Text>
              {achievements.slice(0, 2).map((a, i) => (
                <View key={i} style={s.bullet}><Dot /><Text style={s.bulletText}>{a.title}</Text></View>
              ))}
            </View>
            {achievements.slice(2).map((a, i) => (
              <View key={i} style={s.bullet}><Dot /><Text style={s.bulletText}>{a.title}</Text></View>
            ))}
          </View>

          {/* Certifications */}
          <View style={s.section} wrap={false}>
            <Text style={s.secTitle}>Certifications</Text>
            <View style={s.certRow}>
              {certifications.map((c, i) => <Text key={i} style={s.certTag}>{c.name} — {c.issuer}</Text>)}
            </View>
          </View>

          {/* Volunteer */}
          <View style={s.section}>
            <View wrap={false}>
              <Text style={s.secTitle}>Volunteer & Leadership</Text>
              <VolEntry v={volunteer[0]} />
            </View>
            {volunteer.slice(1).map((v, i) => (
              <View key={i} wrap={false}><VolEntry v={v} /></View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
