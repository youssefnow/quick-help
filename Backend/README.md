# QuickHelp - Plateforme d'Entraide Locale 🤝

QuickHelp est une application web moderne conçue pour connecter instantanément les personnes ayant besoin d'une assistance rapide (courses, transport, aide domestique) avec des volontaires ou des prestataires à proximité.

## ✨ Fonctionnalités Clés

- **Demandes d'aide en temps réel** : Créez des demandes avec catégorie, niveau d'urgence et géolocalisation.
- **Tableau de bord interactif** : Visualisez les demandes ouvertes et suivez vos interventions en cours.
- **Messagerie Intégrée** : Chattez directement avec votre "Helper" ou "Seeker" une fois la demande acceptée.
- **Système d'Évaluation** : Notez la qualité de l'aide reçue via un système d'étoiles (1-5) et des commentaires.
- **Sécurité JWT** : Authentification sécurisée avec protection des routes et des données.
- **Design Premium** : Interface moderne avec mode sombre, glassmorphism et animations fluides.

## 🚀 Technologies Utilisées

### Backend
- **Java 17+** avec **Spring Boot 3**
- **Spring Security & JWT** (Authentification)
- **Spring Data JPA** (Persistance)
- **PostgreSQL** (Base de données)
- **Lombok** (Productivité code)

### Frontend
- **React 18** avec **Vite**
- **Vanilla CSS** (Design système personnalisé)
- **Lucide React** (Iconographie)
- **Axios** (Appels API avec intercepteurs)
- **React Router DOM** (Navigation)

## 🛠️ Installation et Configuration

### 1. Prérequis
- Java JDK 17 ou plus
- Node.js (v18+)
- PostgreSQL installé et en cours d'exécution

### 2. Configuration de la Base de Données
Créez une base de données nommée `quickhelp_db` dans PostgreSQL.
Vérifiez les accès dans `src/main/resources/application.properties` :
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/quickhelp_db
spring.datasource.username=postgres
spring.datasource.password=admin
```

### 3. Lancer le Backend (Spring Boot)
Depuis la racine du projet :
```bash
./mvnw spring-boot:run
```
Le serveur démarrera sur `http://localhost:8080`.

### 4. Lancer le Frontend (React)
Naviguez dans le dossier frontend :
```bash
cd quickhelp-frontend
npm install
npm run dev
```
L'application sera accessible sur `http://localhost:5173`.

## 📖 Scénario de Test

1. **Inscription** : Créez deux comptes (ex: Alice et Bob).
2. **Demande** : Connecté en tant qu'Alice, créez une demande d'aide ("Besoin de porter des sacs").
3. **Acceptation** : Connecté en tant que Bob, allez dans "Browse" et acceptez la demande d'Alice.
4. **Chat** : Utilisez le bouton "Chat" pour envoyer un message de Bob à Alice.
5. **Fin** : Bob clique sur "Complete".
6. **Évaluation** : Alice clique sur "Rate Helper" pour donner 5 étoiles à Bob.

## 📂 Structure du Projet
- `/src/main/java` : Code source Spring Boot (Controllers, Services, Models).
- `/quickhelp-frontend` : Application React Vite.
- `/quickhelp-frontend/src/styles` : Design système et CSS global.
