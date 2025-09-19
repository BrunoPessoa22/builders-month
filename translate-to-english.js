const fs = require('fs');

// Read the Portuguese file
const htmlContent = fs.readFileSync('builders-month-presentation-en.html', 'utf8');

// Translation mappings
const translations = {
  // Title and headers
  'Desafio de Inovação com IA': 'AI Innovation Challenge',
  'A Cultura Builder': 'The Builder Culture',
  'Durante a': 'During the',
  'Revolução Industrial': 'Industrial Revolution',
  'muitos temiam perder seus empregos': 'many feared losing their jobs',
  'Eles estavam certos - mas algo inesperado aconteceu': 'They were right - but something unexpected happened',
  
  // Statistics
  'Crescimento em fábricas têxteis': 'Growth in textile factories',
  'de 1788-1797': 'from 1788-1797',
  'Aumento da população urbana': 'Urban population increase',
  'para 50% até 1850': 'to 50% by 1850',
  'Salários médios duplicaram': 'Average wages doubled',
  'em 60 anos': 'in 60 years',
  
  // AI Revolution section
  'Agora, durante a': 'Now, during the',
  'Revolução da IA': 'AI Revolution',
  'enfrentamos os mesmos medos': 'we face the same fears',
  'E a solução é a mesma': 'And the solution is the same',
  'Aprenda': 'Learn',
  'Construa': 'Build',
  'Inove': 'Innovate',
  'Você não será substituído pela IA': 'You won\'t be replaced by AI',
  'mas por alguém que sabe usar IA': 'but by someone who knows how to use AI',
  'Seja um Builder. Crie o futuro': 'Be a Builder. Create the future',
  
  // What is section
  'O Que É': 'What Is It',
  'Competição': 'Competition',
  'Construa qualquer projeto usando IA': 'Build any project using AI',
  'Networking': 'Networking',
  'Conecte-se com builders e investidores': 'Connect with builders and investors',
  'Prêmios': 'Prizes',
  'USD em cloud credits e mentoria': 'USD in cloud credits and mentorship',
  'Aprendizado': 'Learning',
  'Workshops e suporte da comunidade': 'Workshops and community support',
  
  // Timeline
  'Cronograma': 'Timeline',
  'Lançamento': 'Launch',
  'Início das inscrições': 'Registration opens',
  'Desenvolvimento': 'Development',
  '30 dias para construir': '30 days to build',
  'Submissão': 'Submission',
  'Envio dos projetos': 'Project submission',
  'AI Brasil Event': 'AI Brasil Event',
  'Pitch Final': 'Final Pitch',
  '5 Jurados Renomados': '5 Renowned Judges',
  
  // Requirements
  'Como Participar': 'How to Participate',
  'Use IA como Ferramenta': 'Use AI as a Tool',
  'Qualquer projeto que utilize IA como ferramenta de desenvolvimento ou funcionalidade. Desde usar ChatGPT/Claude para codar até integrar APIs de IA': 'Any project that uses AI as a development tool or feature. From using ChatGPT/Claude for coding to integrating AI APIs',
  'Desenvolva em 30 Dias': 'Develop in 30 Days',
  'Crie seu projeto durante o Builders Month. Pode ser uma ideia nova ou evolução de algo existente usando IA': 'Create your project during Builders Month. It can be a new idea or evolution of something existing using AI',
  'Mostre Algo Funcionando': 'Show Something Working',
  'Não precisa estar perfeito! Apresente um protótipo, MVP ou versão inicial que demonstre sua ideia': 'It doesn\'t need to be perfect! Present a prototype, MVP or initial version that demonstrates your idea',
  'Compartilhe Online': 'Share Online',
  'Deploy em qualquer plataforma (Vercel, GitHub Pages, Replit, etc.) ou grave um vídeo demo se for app/desktop': 'Deploy on any platform (Vercel, GitHub Pages, Replit, etc.) or record a demo video if it\'s an app/desktop',
  
  // Judges
  'Jurados': 'Judges',
  'Empreendedor & Investidor': 'Entrepreneur & Investor',
  'Sócio Cultura Builder': 'Cultura Builder Partner',
  'General Partner & Co-founder': 'General Partner & Co-founder',
  
  // Prizes
  'Premiação': 'Prizes',
  'Aceleração': 'Acceleration',
  'TOP 5 Projetos': 'TOP 5 Projects',
  'Fundadores CB + Time AWS/NVIDIA': 'CB Founders + AWS/NVIDIA Team',
  'Cloud Credits': 'Cloud Credits',
  'Mentoria': 'Mentorship',
  'Mentoria 1:1 Exclusiva': 'Exclusive 1:1 Mentorship',
  'Até USD 250k': 'Up to USD 250k',
  'para cada TOP 5': 'for each TOP 5',
  'Apresentação ao vivo no AI Brasil': 'Live presentation at AI Brasil',
  'Network com': 'Network with',
  'investidores e corporações': 'investors and corporations',
  
  // CTA
  'Construa o Futuro com IA': 'Build the Future with AI',
  'Participe do Builders Month e transforme suas ideias em realidade': 'Join Builders Month and transform your ideas into reality',
  'Inscreva-se Agora': 'Register Now'
};

// Replace all translations
let translatedContent = htmlContent;
for (const [pt, en] of Object.entries(translations)) {
  // Use global replace with proper escaping
  const regex = new RegExp(pt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  translatedContent = translatedContent.replace(regex, en);
}

// Additional date translations
translatedContent = translatedContent.replace(/22 SET - 22 OUT 2024/g, 'SEP 22 - OCT 22, 2024');
translatedContent = translatedContent.replace(/22 SET/g, 'SEP 22');
translatedContent = translatedContent.replace(/22 OUT/g, 'OCT 22');

// Write the English version
fs.writeFileSync('builders-month-presentation-en.html', translatedContent);

console.log('✅ English version created successfully: builders-month-presentation-en.html');