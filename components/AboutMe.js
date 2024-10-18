import React, { useEffect, useState } from 'react';

const AboutMe = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Varsayılan olarak dark mode

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen bg-white rounded-lg`}>
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 flex justify-center items-start">
          <img
            src="aboutfoto.jpg" // Profil resminizin yolunu buraya ekleyin
            alt="Profil"
            className="rounded-full w-32 h-32 mr-6"
          />
          <div className="max-w-md">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">ABOUT ME</h1>
            <p className="text-base mb-4 text-gray-700 dark:text-gray-300">
              As a recent graduate and junior frontend developer, I have gained various experiences in
              web design and coding. Through projects completed during my university studies, I have
              developed skills in creating user-friendly and aesthetic solutions. My passion for technology
              and eagerness to learn drive my motivation to continually advance in my career and
              participate in innovative projects.
            </p>
            <h2 className="text-2xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">EDUCATION</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Konya Technical University, 2024</li>
              <li>Computer Engineering Bachelors Degree</li>
            </ul>
            <h2 className="text-2xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">SKILLS</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Programming Languages: C, Java, Javascript, Typescript, Python</li>
              <li>Libraries/Frameworks: React, NextJs, NodeJs, Bootstrap</li>
              <li>Tools / Platforms: Docker, Git</li>
              <li>Databases: MySQL, PostgreSQL, MongoDb</li>
            </ul>
            <h2 className="text-2xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">CERTIFICATIONS</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Html ile Web Geliştirme - BTK AKADEMİ</li>
              <li>Css ile Web Geliştirme - BTK AKADEMİ</li>
              <li>Proje Yönetimi - BTK AKADEMİ</li>
              <li>E-Ticaret - BTK AKADEMİ</li>
              <li>Dijital Perakende Uzmanlığı - BTK AKADEMİ</li>
              <li>Sosyal Medya Uzmanlığı - BTK AKADEMİ</li>
            </ul>
            <h2 className="text-2xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">EXPERIENCE</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>ZENAM BİLİŞİM TEKNOLOJİLERİ</li>
              <p>Frontend Developer Intern</p>
              <p>During my internship, I gained valuable insights into system architectures by studying
                documentation. This allowed me to contribute to the development and improvement of
                various systems. My ability to understand and apply information from documentation helped
                me navigate complex projects and deliver effective solutions.</p>
              <p>Technologies used: Java, C#, React, MySQL</p>
              <br />
              <li>ERDEREN YAZILIM HİZMETLERİ</li>
              <p>Frontend Developer Intern</p>
              <p>During my internship, I gained hands-on experience in developing applications. I focused on
                front-end development, built backend services, and managed data efficiently. This experience
                helped me improve my practical skills and collaborate effectively within a team.</p>
              <p>Technologies used: React, Node.js, Express.js, MongoDB</p>
              <br />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
