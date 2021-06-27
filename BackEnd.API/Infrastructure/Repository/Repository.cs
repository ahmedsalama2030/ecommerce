using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
 using Core.Interfaces;
 using Infrastructure.Data;

namespace Infrastructure.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {

        private readonly ApplicationDbContext _db;
        private DbSet<T> Entity = null;
        public Repository(ApplicationDbContext db)
        {
            _db = db;
           Entity = _db.Set<T>();
        }

        public void Update(T entity)
        {
            Entity.Attach(entity);
            _db.Entry(entity).State = EntityState.Modified;
        }

        public void Add(T entity)
        {
            Entity.Add(entity);
        }
        public DbSet<T> Table()
        {
            return Entity;
        }
         public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await Entity.ToListAsync();

        }

        public async Task<IEnumerable<T>> GetAllAsync(Expression<System.Func<T, bool>> whereCondition)
        {
            return await Entity.Where(whereCondition).ToListAsync();

        }

        public IQueryable<T> GetQueryable()
        {

            return Entity;
        }
         public    IQueryable<T>  GetQueryable(Expression<System.Func<T, bool>> whereCondition)
        {

            return   Entity.Where(whereCondition);
        }
        public IQueryable<T> GetQueryable(params Expression<Func<T, object>>[] includes)
        {
            var result = Entity.Where(i => true);

            foreach (var includeExpression in includes)
                result = result.Include(includeExpression);

            return result;
        }
         public    IQueryable<T>  GetQueryable(Expression<System.Func<T, bool>> whereCondition,params Expression<Func<T, object>>[] includes)
        {

               var result = Entity.Where(whereCondition);

            foreach (var includeExpression in includes)
                result = result.Include(includeExpression);
                 return result;
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await Entity.FindAsync(id);
        }

        public async Task<T> FindBy(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            var result = Entity.Where(predicate);

            foreach (var includeExpression in includes)
                result = result.Include(includeExpression);

            return await result.FirstOrDefaultAsync();
        }



        public async Task<IEnumerable<T>> IncludeAsync(params Expression<Func<T, object>>[] includes)
        {
            var result = Entity.Where(i => true);

            foreach (var includeExpression in includes)
                result = result.Include(includeExpression);

            return await result.ToListAsync();
        }
        public    IQueryable<T> IncludeIQueryableAsync(params Expression<Func<T, object>>[] includes)
        {
            var result = Entity.Where(i => true);

            foreach (var includeExpression in includes)
                result = result.Include(includeExpression);

            return   result;
        }

        public IEnumerable<T> OrderBy(Expression<System.Func<T, bool>> orderLambda)
        {
            return Entity.OrderBy(orderLambda);
        }



        public async Task<IEnumerable<T>> SearchAsync(Expression<System.Func<T, bool>> whereCondition)
        {
            var result = Entity.Where(whereCondition);
            return await result.ToListAsync();
        }

        public async Task<IEnumerable<T>> SearchAsync(Expression<System.Func<T, bool>> whereCondition, params Expression<System.Func<T, object>>[] includes)
        {

            var result = Entity.Where(whereCondition);

            foreach (var includeExpression in includes)
                result = result.Include(includeExpression);

            return await result.ToListAsync();
        }


        public async Task<T> SingleOrDefaultAsync(Expression<System.Func<T, bool>> whereCondition)
        {
            var result = await Entity.Where(whereCondition).FirstOrDefaultAsync();
            return result;
        }

        public int GetCount(Expression<Func<T, bool>> whereCondition)
        {
            int count = Entity.Where(whereCondition).Count();
            return count;

        }

        public bool IsFound(Expression<Func<T, bool>> whereCondition)
        {
            int count = GetCount(whereCondition);
            if (count > 0)
            {
                return true;
            }
            return false;
        }

        public void Delete(T entity)
        {
            Entity.Remove(entity);
        }
         public void DeleteRange(params T[] entities)
        {
            Entity.RemoveRange(entities);
        }


         


    }
}