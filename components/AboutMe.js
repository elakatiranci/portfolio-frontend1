import React from 'react';

const AboutMe = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-2 flex justify-center items-start min-h-screen">
        <img
          src="aboutfoto.jpg" // Profil resminizin yolunu buraya ekleyin
          alt="Profil"
          className="rounded-full w-32 h-32 mr-6"
        />
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-2">ABOUT ME</h1>
          <p className="text-base mb-4">
            As a recent graduate and junior frontend developer, I have gained various experiences in
            web design and coding. Through projects completed during my university studies, I have
            developed skills in creating user-friendly and aesthetic solutions. My passion for technology
            and eagerness to learn drive my motivation to continually advance in my career and
            participate in innovative projects.
          </p>
          <h2 className="text-2xl font-bold mt-6 mb-2">EDUCATION</h2>
          <ul className="list-disc list-inside">
            Konya Technical University, 2024
            Computer Engineering Bachelors Degree
          </ul>
          <h2 className="text-2xl font-bold mt-6 mb-2">SKILLS</h2>
              <li>Programming Languages: C, Java, Javascript, Typescript, Python<br /></li>
              <li>Libraries/Frameworks: React, NextJs, NodeJs, Bootstrap<br /></li>
              <li>Tools / Platforms: Docker, Git<br /></li>
              <li>Databases: MySQL, PostgreSQL, MongoDb</li>
          <h2 className="text-2xl font-bold mt-6 mb-2">CERTIFICATIONS</h2>
              <li>Html ile Web Geliştirme - BTK AKADEMİ<br /></li>
              <li>Css ile Web Geliştirme - BTK AKADEMİ<br /></li>
              <li>Proje Yönetimi - BTK AKADEMİ<br /></li>
              <li>E-Ticaret - BTK AKADEMİ<br /></li>
              <li>Dijital Perakende Uzmanlığı - BTK AKADEMİ<br /></li>
              <li>Sosyal Medya Uzmanlığı - BTK AKADEMİ</li>
              <h2 className="text-2xl font-bold mt-6 mb-2">EXPERIENCE</h2>
                <li>ZENAM BİLİŞİM TEKNOLOJİLERİ</li>
                Frontend Developer Intern
                During my internship, I gained valuable insights into system architectures by studying
                documentation. This allowed me to contribute to the development and improvement of
                various systems. My ability to understand and apply information from documentation helped
                me navigate complex projects and deliver effective solutions.
                Technologies used:
                Java
                C#
                React
                MySQL<br /><br />
                <li>ERDEREN YAZILIM HİZMETLERİ</li>
                Frontend Developer Intern
                During my internship, I gained hands-on experience in developing applications. I focused on
                front-end development, built backend services, and managed data efficiently. This experience
                helped me improve my practical skills and collaborate effectively within a team.
                Technologies used:
                React
                Node.js
                Express.js
                MongoDB
                <br /><br />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
