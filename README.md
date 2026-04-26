# QuickHelp - Plateforme d'Entraide Locale 🤝

QuickHelp est une application web moderne de type "Uber for Help", conçue pour connecter instantanément les personnes ayant besoin d'une assistance rapide avec des volontaires à proximité.

## ✨ Fonctionnalités Clés

- **📍 Géolocalisation** : Visualisez et créez des demandes d'aide avec une position précise.
- **🚨 Niveaux d'Urgence** : Filtrez les demandes par priorité (Faible, Moyenne, Haute, Critique).
- **💬 Messagerie en Temps Réel** : Système de chat intégré pour coordonner l'aide une fois la demande acceptée.
- **⭐ Système de Feedback** : Évaluation des "Helpers" avec notes (1-5 étoiles) et commentaires détaillés.
- **🔐 Sécurité Avancée** : Authentification via JWT (JSON Web Tokens) et protection des routes.
- **🎨 Design Premium** : Interface responsive, mode sombre élégant, effets de flou (glassmorphism) et micro-animations.

---

## 🚀 Technologies Utilisées

### **Backend (Spring Boot)**
- **Java 17** : Langage principal.
- **Spring Boot 3.1.5** : Framework core.
- **Spring Security & JWT** : Gestion de l'authentification et des sessions.
- **Spring Data JPA** : Abstraction de la base de données.
- **PostgreSQL** : Système de gestion de base de données relationnelle.
- **Lombok** : Simplification du code (getters/setters).

### **Frontend (React)**
- **React 18** : Librairie UI.
- **Vite** : Outil de build ultra-rapide.
- **Vanilla CSS** : Design système personnalisé (sans frameworks CSS externes pour plus de contrôle).
- **Lucide React** : Pack d'icônes modernes.
- **Axios** : Client HTTP avec intercepteurs pour le token JWT.

---

## 🛠️ Installation et Configuration

### 1. Configuration de la Base de Données
Créez une base de données PostgreSQL nommée `quickhelp_db`.
Vérifiez la configuration dans `Backend/src/main/resources/application.properties` :
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/quickhelp_db
spring.datasource.username=postgres
spring.datasource.password=admin
```

### 2. Lancer le Backend
```bash
cd Backend
./mvnw spring-boot:run
```
*Le serveur tourne sur `http://localhost:8080`.*

### 3. Lancer le Frontend
```bash
cd quickhelp-frontend
npm install
npm run dev
```
*L'application est accessible sur `http://localhost:5173`.*

---

## 📋 API Endpoints

| Méthode | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Créer un nouveau compte |
| **POST** | `/api/auth/login` | Se connecter et recevoir un token |
| **GET** | `/api/requests` | Liste toutes les demandes d'aide |
| **POST** | `/api/requests` | Créer une nouvelle demande |
| **PUT** | `/api/requests/{id}/accept` | Accepter d'aider quelqu'un |
| **PUT** | `/api/requests/{id}/complete` | Marquer une demande comme terminée |
| **POST** | `/api/feedback` | Laisser un avis et une note |
| **GET** | `/api/messages/request/{id}` | Historique des messages d'une demande |

---

## 🧹 Maintenance : Gestion des Données

Si vous souhaitez réinitialiser votre base de données ou supprimer des comptes/messages manuellement :

### Supprimer toutes les données (Réinitialisation totale)
Connectez-vous à `quickhelp_db` via **pgAdmin** ou **psql** et exécutez :
```sql
TRUNCATE TABLE messages, feedbacks, help_requests, users RESTART IDENTITY CASCADE;
```

### Supprimer un utilisateur spécifique
```sql
DELETE FROM users WHERE email = 'exemple@mail.com' CASCADE;
```

---

## 📂 Structure du Projet

```text
QuickHelp/
├── Backend/                 # Projet Spring Boot
│   ├── src/main/java/       # Code source (Entities, Repos, Controllers)
│   └── src/main/resources/  # Configuration (application.properties)
├── quickhelp-frontend/      # Projet React
│   ├── src/components/      # Composants UI (Modals, Cards, Nav)
│   ├── src/services/        # Appels API (Axios)
│   └── src/styles/          # Design Système & CSS
└── README.md                # Documentation
```

---

## ⚖️ Licence
Projet réalisé dans le cadre du développement **QuickHelp - 2026**.
