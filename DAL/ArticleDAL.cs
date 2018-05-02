using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Model;

namespace DAL
{
    public class ArticleDAL
    {
        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="ArticleInfo"></param>
        /// <returns></returns>
        public int Add(ArticleInfo ArticleInfo)
        {
            using (LZUnionDBEntitiesConn TrizDB = new LZUnionDBEntitiesConn())
            {
                try
                {
                    tbl_ArticleInfo ArticleInfoEntity = new tbl_ArticleInfo();
                    SetDataEntity(ArticleInfoEntity, ArticleInfo);
                    TrizDB.tbl_ArticleInfo.Add(ArticleInfoEntity);
                    if (TrizDB.SaveChanges() > 0)
                        return ArticleInfoEntity.ID;
                }
                catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
                {
                    Exception raise = dbEx;
                    foreach (var validationErrors in dbEx.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            string message = string.Format("Article,{1}",
                                validationErrors.Entry.Entity.ToString(),
                                validationError.ErrorMessage);
                            raise = new InvalidOperationException(message, raise);
                            throw raise;
                        }
                    }
                }
            }
            return 0;
        }

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="ArticleInfo"></param>
        /// <returns></returns>
        public bool Update(ArticleInfo ArticleInfo)
        {
            bool result = false;
            using (LZUnionDBEntitiesConn TrizDB = new LZUnionDBEntitiesConn())
            {
                try
                {
                    var Query = TrizDB.tbl_ArticleInfo.Where(o => o.ID == ArticleInfo.ID).FirstOrDefault();
                    if (Query == null) return false;
                    SetDataEntity(Query, ArticleInfo);
                    TrizDB.SaveChanges();
                    if (TrizDB.SaveChanges() > 0)
                        result = true;
                    return result;
                }
                catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
                {
                    Exception raise = dbEx;
                    foreach (var validationErrors in dbEx.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            string message = string.Format("{0},{1}",
                                validationErrors.Entry.Entity.ToString(),
                                validationError.ErrorMessage);
                            raise = new InvalidOperationException(message, raise);
                            throw raise;
                        }
                    }
                }
            }
            return false;
        }

        /// <summary>
        /// 删除记录
        /// </summary>
        /// <param name="ArticleInfo"></param>
        /// <returns></returns>
        public int Delete(int id)
        {
            using (LZUnionDBEntitiesConn TrizDB = new LZUnionDBEntitiesConn())
            {
                try
                {
                    var Query = TrizDB.tbl_ArticleInfo.Where(o => o.ID == id).FirstOrDefault();
                    if (Query == null) return 0;
                    TrizDB.tbl_ArticleInfo.Remove(Query);
                    return TrizDB.SaveChanges();
                }
                catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
                {
                    Exception raise = dbEx;
                    foreach (var validationErrors in dbEx.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            string message = string.Format("{0},{1}",
                                validationErrors.Entry.Entity.ToString(),
                                validationError.ErrorMessage);
                            raise = new InvalidOperationException(message, raise);
                            throw raise;
                        }
                    }
                }
            }
            return 0;
        }

        public ArticleInfo GetByID(int ID)
        {
            using (LZUnionDBEntitiesConn TrizDB = new LZUnionDBEntitiesConn())
            {
                try
                {
                    var Query = TrizDB.tbl_ArticleInfo.Where(o => o.ID == ID).FirstOrDefault();
                    if (Query == null) return new ArticleInfo();
                    return GetBusinessObject(Query);
                }
                catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
                {
                    Exception raise = dbEx;
                    foreach (var validationErrors in dbEx.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            string message = string.Format("{0},{1}",
                                validationErrors.Entry.Entity.ToString(),
                                validationError.ErrorMessage);
                            raise = new InvalidOperationException(message, raise);
                            throw raise;
                        }
                    }
                }
            }
            return new ArticleInfo();
        }

        public List<ArticleInfo> Query(string DicID, string Title, int pageIndex, int pageSize, ref int totalItems, ref int PagesLength)
        {
            int startRow = (pageIndex - 1) * pageSize;
            Expression<Func<tbl_ArticleInfo, bool>> where = PredicateExtensionses.True<tbl_ArticleInfo>();

            if (!string.IsNullOrWhiteSpace(DicID))
                where = where.And(a => a.DicID==int.Parse(DicID));

            if (!string.IsNullOrWhiteSpace(Title))
                where = where.And(a => a.Title.Contains(Title));

            using (LZUnionDBEntitiesConn TrizDB = new LZUnionDBEntitiesConn())
            {
                var query = TrizDB.tbl_ArticleInfo.Where(where.Compile());
                totalItems = query.Count();
                PagesLength = (int)Math.Ceiling((double)totalItems / pageSize);
                query = query.OrderByDescending(p => p.ID).Skip(startRow).Take(pageSize);
                return GetGetBusinessObjectList(query.ToList());
            }
        }

        public ArticleInfo GetBusinessObject(tbl_ArticleInfo ArticleInfoEntity)
        {
            ArticleInfo ArticleInfo = new ArticleInfo();

            ArticleInfo.ID = ArticleInfoEntity.ID;

            ArticleInfo.DicID = ArticleInfoEntity.DicID;

            ArticleInfo.SerialNum = ArticleInfoEntity.SerialNum;

            ArticleInfo.Title = ArticleInfoEntity.Title;

            ArticleInfo.IsTopArticle = ArticleInfoEntity.IsTopArticle;

            ArticleInfo.Note = ArticleInfoEntity.Note;

            ArticleInfo.Remark = ArticleInfoEntity.Remark;

            ArticleInfo.CreateDateTime = ArticleInfoEntity.CreateDateTime;


            return ArticleInfo;
        }

        public void SetDataEntity(tbl_ArticleInfo ArticleInfoEntity, ArticleInfo ArticleInfo)
        {

            if (ArticleInfo.ID != null)
                ArticleInfoEntity.ID = ArticleInfo.ID ?? 0;

            if (ArticleInfo.DicID != null)
                ArticleInfoEntity.DicID = ArticleInfo.DicID;

            if (ArticleInfo.SerialNum != null)
                ArticleInfoEntity.SerialNum = ArticleInfo.SerialNum;

            if (ArticleInfo.Title != null)
                ArticleInfoEntity.Title = ArticleInfo.Title;

            if (ArticleInfo.IsTopArticle != null)
                ArticleInfoEntity.IsTopArticle = ArticleInfo.IsTopArticle;

            if (ArticleInfo.Note != null)
                ArticleInfoEntity.Note = ArticleInfo.Note;

            if (ArticleInfo.Remark != null)
                ArticleInfoEntity.Remark = ArticleInfo.Remark;

        }

        public List<ArticleInfo> GetGetBusinessObjectList(List<tbl_ArticleInfo> ArticleInfoEntityList)
        {
            List<ArticleInfo> ArticleInfoList = new List<ArticleInfo>();
            foreach (tbl_ArticleInfo tbl_ArticleInfo in ArticleInfoEntityList)
            {
                ArticleInfoList.Add(GetBusinessObject(tbl_ArticleInfo));
            }
            return ArticleInfoList;
        }
    }
}



