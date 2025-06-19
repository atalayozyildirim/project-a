# Microservices Project

## Overview

This project is a microservices-based application that includes several services such as Notification,Expiration,Chart,Auth,Order,Invoice,Payment services. These services interact with RabbitMQ,MongoDB, and Redis to provide a robust and scalable system.

## Services
- Auth
- client
- Customers
- Chart
- employers
- exprirations
- notification
- order
- payment-services
- invoice
- product
- xlsx
- Task 
- Mail

## Architecture

- **RabbitMQ**: Used for message brokering between services.
- **MongoDB**: Used for storing product data.
- **Redis**: Used for caching and other purposes.

## Prerequisites

- Docker
- Kubernetes
- Skaffold
- Node.js
- Bun js
- Redis
- MongoDb
- Deno js
- npm

## Getting Started

### 1. Repository'yi Klonlayın

```sh
git clone https://github.com/atalayozyildirim/project-a.git
cd project-a
```

### 2. Ortam Değişkenlerini Ayarlayın

Her servis için `.env` dosyalarını oluşturun ve aşağıdaki temel ortam değişkenlerini doldurun (örnek):

```
MONGO_URI=mongodb://localhost:27017/servis-adi
RABBITMQ_URI=amqp://localhost
REDIS_URI=redis://localhost:6379
JWT_KEY=your_jwt_secret
```

> Her servisin kendi `README.md` dosyasında veya `config` klasöründe ihtiyaç duyduğu değişkenler belirtilmiş olabilir.

### 3. Gerekli Servisleri Başlatın

#### Docker ile RabbitMQ, MongoDB ve Redis'i başlatın:

```sh
docker run -d --name mongo -p 27017:27017 mongo
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
docker run -d --name redis -p 6379:6379 redis
```

#### (Opsiyonel) Tüm servisleri Kubernetes ile başlatmak için:

```sh
skaffold dev
```

### 4. Servislerin Bağımlılıklarını Kurun

Her servis klasörüne girip bağımlılıkları yükleyin. Örneğin:

```sh
cd auth-services
bun install
cd ../email
bun install
cd ../client
npm install
# Diğer servisler için de aynı işlemi tekrarlayın
```

### 5. Servisleri Başlatın

Her servisi kendi klasöründe başlatın:

```sh
bun run index.ts
# veya bazı servislerde:
bun run main.ts
# veya Next.js client için:
npm run dev
```

> Hangi dosyanın çalıştırılacağı ilgili servis klasöründeki `README.md` dosyasında belirtilmiştir.

### 6. Uygulamayı Görüntüleyin

Client (Next.js) servisi için:
- [http://localhost:3000](http://localhost:3000) adresini ziyaret edin.

API servisleri için:
- Her servis kendi portunda çalışır (ör: 3000, 3001, 3002 ...). Detaylar ilgili servislerin `index.ts` dosyasında veya `README.md`'de bulunabilir.

---

## Sık Karşılaşılan Sorunlar

- **Port Çakışmaları:** Servislerin kullandığı portların başka uygulamalar tarafından kullanılmadığından emin olun.
- **Ortam Değişkenleri Eksik:** `.env` dosyalarını eksiksiz doldurduğunuzdan emin olun.
- **Bağımlılık Hataları:** `bun install` veya `npm install` komutlarını her servis için ayrı ayrı çalıştırın.

---

## Katkı Sağlamak

Pull request'ler ve issue'larınızı bekliyoruz!

---

## Ekstra Kaynaklar

- [Bun](https://bun.sh)
- [Next.js](https://nextjs.org)
- [RabbitMQ](https://www.rabbitmq.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)