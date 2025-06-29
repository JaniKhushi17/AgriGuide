import Layout from "../layout/layout";
import Carousel from "../components/Carousel";
import { AlertCircle, Cloud, MessageCircle } from 'lucide-react';
import "./Home.css"


const Home = () => {
    const cards = [
        {
          title: "Crop Disease",
          description: "Identify and treat common crop diseases with our AI-powered disease recognition system. Upload photos for instant diagnosis.",
          icon: <AlertCircle />,
          colorClass: "disease-card"
        },
        {
          title: "Weather Forecast",
          description: "Get accurate, localized weather predictions for your farm. Plan your activities with our 10-day forecast and alerts.",
          icon: <Cloud />,
          colorClass: "weather-card"
        },
        {
          title: "Farm Assistant",
          description: "Our AI chatbot provides 24/7 support for all your farming questions. Get expert advice anytime, anywhere. In 3 languages.",
          icon: <MessageCircle />,
          colorClass: "chatbot-card"
        }
      ];
    return (
        <Layout>
            <Carousel></Carousel>
            <h1 className="heading">Welcome to AgriGuide</h1>

            <div className="agriculture-cards-container">
      <div className="cards-wrapper">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card.colorClass}`}
          >
            {/* Top curved notch */}
            <div className="card-notch">
              <div className="icon-container">
                {card.icon}
              </div>
            </div>
            
            {/* Card content */}
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">
                {card.description}
              </p>
            </div>
            
            {/* Bottom curved shape */}
            <div className="card-bottom"></div>
          </div>
        ))}
      </div>
    </div>
        </Layout>
    );
};

export default Home;
