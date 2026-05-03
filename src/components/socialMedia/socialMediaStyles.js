import styled from "styled-components";

export const SocialContainer = styled.div`
  text-align: center;
  padding-bottom: 2rem;
`;

export const SocialText = styled.p`
  color: var(--text-muted);
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const SocialIcon = styled.a`
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--dark-light);
  color: var(--light);
  font-size: 1.1rem;
  transition: all 0.2s;

  &:hover {
    background: var(--gold);
    color: var(--dark);
    transform: translateY(-2px);
  }
`;
