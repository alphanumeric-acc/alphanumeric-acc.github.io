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
> ##### ☁ working on SAAS solution ?

  wonder how to separate information and customization for each of your clients so that you isolate access to information and minimize coupling ,If there is a problem with one client's data set, it won't impact the other clients.


  if that the case : welcome to multi-tenancy concept 🚀


it indicate an architecture in which a single instance of an application serves simultaneously multiple clients (tenants)

following to Hibernate Documentation there is three main approaches to isolate information in multi-tenant systems


##### ✅ Separate database

Each tenant's data is kept in a physically separate database instance. JDBC Connections would point specifically to each database, so any pooling would be per-tenant. A general application approach here would be to define a JDBC Connection pool per-tenant and to select the pool to use based on the “tenant identifier” associated with the currently logged in user.


example:

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

##### ✅ Separate schema

Each tenant's data is kept in a distinct database schema on a single database instance.


##### ✅ Partitioned (discriminator) data

All data is kept in a single database schema. The data for each tenant is partitioned by the use of partition value or discriminator. The complexity of this discriminator might range from a simple column value to a complex SQL formula. Again, this approach would use a single Connection pool to service all tenants. However, in this approach the application needs to alter each and every SQL statement sent to the database to reference the “tenant identifier” discriminator.


#### Using Hibernate

Hibernate try to keep the API simple and isolated from any integration complexities , by just passing the client (tenant) identifier as part of opening session.

```
Session session = sessionFactory.withOptions()
    .tenantIdentifier( "tenant_1" )
    .openSession();
```



That mean Hibernate will use this identifier to determine which database schema to use for the duration of the session. This is the case for all three approaches.




Additionally, Hibernate provides a number of configuration properties that can be used to control the multi-tenancy behavior. These properties are 
prefixed with hibernate.multi_tenant. and are described in the following table.



| Property | Description |
| --- | --- |
| hibernate.multi_tenant_connection_provider | The name of the ConnectionProvider implementation to use. |
| hibernate.multi_tenant_identifier_resolver | The name of the MultiTenantIdentifierResolver implementation to use. |
| hibernate.multi_tenant_connection_provider | The name of the ConnectionProvider implementation to use. |







#### Conclusion

Multi-tenancy (Database prt tenant model) is a very powerful concept that can be used to isolate information and customization for each of your clients. It is a very common requirement for SaaS solutions.

Hibernate provides a number of features to help you implement multi-tenancy in your application. The most important one is the ability to pass the client identifier as part of opening a Session. This identifier is then used to determine which database schema to use for the duration of the Session. This is the case for all three approaches.


#### References

- [Hibernate Documentation](https://docs.jboss.org/hibernate/orm/4.1/devguide/en-US/html/ch16.html)
- [Multi-tenancy with Spring Boot](https://www.baeldung.com/multitenancy-with-spring-data-jpa)




> You don’t understand anything until you learn it more than one way.” — Marvin Minsky
