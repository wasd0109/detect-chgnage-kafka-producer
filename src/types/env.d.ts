// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'; // Example of a predefined variable
        DB_CONNECTION_STRING: string;
        KAFKA_BOOTSTRAP_SERVER: string;
        KAFKA_SECURITY_PROTOCOL: ("plaintext" | "ssl" | "sasl_plaintext" | "sasl_ssl");
        KAFKA_SASL_MECHANISM: string;
        KAFKA_SASL_USERNAME: string;
        KAFKA_SASL_PASSWORD: string;
        KAFKA_CLIENT_ID: string;
    }
}