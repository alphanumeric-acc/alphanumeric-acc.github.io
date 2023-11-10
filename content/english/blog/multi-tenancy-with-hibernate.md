---
title: "Multi-Tenancy with Hibernate"
meta_title: "saas solutions , working with separate database per tenant (multi-tenancy), hibernate"
description:  "wonder how to separate information and customization for each of your clients so that you isolate access to information and minimize coupling ,If there is a problem with one client's data set, it won't impact the other clients."
date: 2023-10-10T00:00:00Z
image: "/images/articles-assets/multi-tenant.png"
categories: ["Backend"]
author: "Mounir El Bakkali"
tags: ["backend","saas"]
draft: false
---
> ##### Are you developing a Software as a Service (SAAS) solution?
  Perhaps you're wondering how to segregate data and settings for each of your clients in such a way that you can restrict access to information, limit coupling, and ensure that if there's an issue with one client's data set, it won't affect the others.

If that's your scenario, then you're at the right place: Welcome to the concept of multi-tenancy 🚀

In simple terms, multi-tenancy refers to an architecture where a single instance of an application serves multiple clients (known as tenants) simultaneously.

According to the Hibernate Documentation, there are three primary approaches to isolating information in multi-tenant systems, each with its own pros and cons.

#####  Separate database

In this approach, each tenant's data is stored in a physically separate database instance. JDBC Connections would point specifically to each database, meaning any pooling would be per-tenant. A common application approach here would be to define a JDBC Connection pool for each tenant and select the pool to use based on the “tenant identifier” associated with the currently logged in user.

Here's an example of what this might look like:


```
├── tenant_1
│   ├── schema_1
│   │   ├── table_1
│   │   └── table_2
│   └── schema_2
│       ├── table_1
│       ├── table_2
├── tenant_2
│   ├── schema_1
│   │   ├── table_1
│   │   └── table_2
│   └── schema_2
│       ├── table_1
│       ├── table_2

```

#####  Separate schema

In this approach, each tenant's data is kept in a distinct database schema within a single database instance. This provides a level of separation while still maintaining a unified infrastructure.

#####  Partitioned (discriminator) data

In this scenario, all data is kept in a single database schema. The data for each tenant is partitioned by the use of a partition value or discriminator. The complexity of this discriminator might range from a simple column value to a complex SQL formula. Again, this approach would use a single Connection pool to service all tenants. However, in this approach, the application needs to modify each and every SQL statement sent to the database to reference the “tenant identifier” discriminator.

#### Using Hibernate to facilitate multi-tenancy

Hibernate aims to keep the API simple and isolated from any integration complexities, by just passing the client (tenant) identifier as part of opening a session.


```
Session session = sessionFactory.withOptions()
    .tenantIdentifier( "tenant_1" )
    .openSession();
```

This means that Hibernate will use this identifier to determine which database schema to use for the duration of the session, which is the case for all three approaches.

In addition, Hibernate provides a number of configuration properties that can be used to control the multi-tenancy behavior. These properties are prefixed with `hibernate.multi_tenant.` and are described in the following table.


| Property | Description |
| --- | --- |
| hibernate.multi_tenant_connection_provider | The name of the ConnectionProvider implementation to use. |
| hibernate.multi_tenant_identifier_resolver | The name of the MultiTenantIdentifierResolver implementation to use. |
| hibernate.multi_tenant_connection_provider | The name of the ConnectionProvider implementation to use. |







#### Conclusion

In conclusion, multi-tenancy (specifically, the Database per tenant model) is a highly potent concept that can be utilized to isolate information and customization for each of your clients, making it a common requirement for SaaS solutions.

Hibernate provides an array of features to aid you in implementing multi-tenancy in your application, the most significant of which is the ability to pass the client identifier when opening a Session. This identifier is then employed to determine which database schema to use for the duration of the Session, which holds true across all three approaches.


#### References

- [Hibernate Documentation](https://docs.jboss.org/hibernate/orm/4.1/devguide/en-US/html/ch16.html)
- [Multi-tenancy with Spring Boot](https://www.baeldung.com/multitenancy-with-spring-data-jpa)




> You don’t understand anything until you learn it more than one way.” — Marvin Minsky
