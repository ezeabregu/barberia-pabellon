import { Link } from "react-router-dom";
import styled from "styled-components";

export const HomeContainer = styled.div`
  padding: 5rem 2rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 400px;
    background: radial-gradient(
      ellipse,
      rgba(201, 168, 76, 0.08) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  h1 {
    font-family: "Playfair Display", serif;
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  h1 em {
    color: var(--gold);
    font-style: italic;
  }
  p {
    color: var(--text-muted);
    font-size: 1rem;
    max-width: 420px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
    font-weight: 300;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  img {
    height: 300px;
    width: auto;
    border-radius: 50%;
  }
`;

export const HeroCta = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const HeroTag = styled.div`
  display: inline-block;
  font-size: 0.7rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--gold);
  border: 1px solid var(--border);
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  margin-bottom: 1.5rem;
`;

export const ButtonPrimary = styled(Link)`
  background: var(--gold);
  color: var(--dark);
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    background: var(--gold-light);
    transform: translateY(-1px);
  }
`;

export const ButtonOutline = styled.button`
  background: transparent;
  color: var(--gold);
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid var(--border);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;

  &:hover {
    border-color: var(--gold);
    background: rgba(201, 168, 76, 0.05);
  }
`;

export const Divider = styled.div`
  width: 60px;
  height: 2px;
  background: var(--gold);
  margin: 3rem auto;
  opacity: 0.5;
`;

export const Section = styled.div`
  padding: 3rem 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

export const SectionTitle = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const SectionSub = styled.div`
  color: var(--text-muted);
  text-align: center;
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

export const ServiceCard = styled(Link)`
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  text-decoration: none;

  &,
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: var(--gold);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gold);
    transform: scaleX(0);
    transition: transform 0.2s;
  }

  &:hover,
  .selected {
    border-color: rgba(201, 168, 76, 0.5);
    background: var(--dark3);
  }

  .selected::after {
    transform: scaleX(1);
  }
`;

export const ServiceIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
`;

export const ServiceName = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

export const ServicePrice = styled.div`
  color: var(--gold);
  font-size: 1.2rem;
  font-weight: 500;
`;

export const ServiceTime = styled.div`
  color: var(--text-muted);
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;
