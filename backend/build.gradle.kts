plugins {
    java
    id("org.springframework.boot") version "3.4.5"
    id("io.spring.dependency-management") version "1.1.7"
    id("com.github.ben-manes.versions") version "0.53.0" // ver o que precisa atualizar (roda: ./gradlew dependencyUpdate)
}

group = "br.com.anaprado"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Web + Tomcat gerenciado automaticamente pelo Spring Boot
    implementation("org.springframework.boot:spring-boot-starter-web")

    // JPA
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")

    // Security
    implementation("org.springframework.boot:spring-boot-starter-security")

    // Validation
    implementation("org.springframework.boot:spring-boot-starter-validation")

    // Mail
    implementation("org.springframework.boot:spring-boot-starter-mail")

    // Lombok
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    // Devtools
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    // PostgreSQL
    runtimeOnly("org.postgresql:postgresql")

    // Jsoup (pode manter)
    implementation("org.jsoup:jsoup:1.21.1")

    // Mapstruct
    implementation("org.mapstruct:mapstruct:1.6.3")
    annotationProcessor("org.mapstruct:mapstruct-processor:1.6.3")

    // JWT
    implementation("com.auth0:java-jwt:4.5.0")

    // Flyway - Usado para gerenciar o banco de dados
    implementation("org.flywaydb:flyway-core")
    implementation("org.flywaydb:flyway-database-postgresql")

    // Springdoc
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.5")

    // Tests
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

    // Usado para enviar e-mail de cadastro
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-thymeleaf
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")

}

tasks.withType<Test> {
    useJUnitPlatform()
}
