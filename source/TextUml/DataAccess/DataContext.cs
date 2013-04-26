﻿namespace TextUml.DataAccess
{
    using System;
    using System.Data;
    using System.Data.Entity;

    using DomainObjects;

    public interface IDataContext : IDisposable
    {
        IDbSet<User> Users { get; }

        IDbSet<Document> Documents { get; }
 
        void MarkAsModified<T>(T instance) where T : class;

        int SaveChanges();
    }

    public class DataContext : DbContext, IDataContext
    {
        private IDbSet<User> users;
        private IDbSet<Document> documents;
 
        public DataContext() : base("DefaultConnection")
        {
        }

        public IDbSet<User> Users
        {
            get { return users ?? (users = CreateSet<User>()); }
        } 

        public IDbSet<Document> Documents
        {
            get { return documents ?? (documents = CreateSet<Document>()); }
        }

        public void MarkAsModified<T>(T instance) where T : class
        {
            Entry(instance).State = EntityState.Modified;
        }

        protected virtual IDbSet<T> CreateSet<T>() where T : class
        {
            return Set<T>();
        }
    }
}