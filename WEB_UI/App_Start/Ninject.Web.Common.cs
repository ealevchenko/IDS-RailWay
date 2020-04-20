[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(WEB_UI.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(WEB_UI.App_Start.NinjectWebCommon), "Stop")]

namespace WEB_UI.App_Start
{
    using System;
    using System.Web;

    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    using Ninject;
    using Ninject.Web.Common;
    using Ninject.Web.Common.WebHost;
    using Ninject.Web.WebApi;
    using System.Web.Http;
    using System.ComponentModel;

    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }

        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
                RegisterServices(kernel);

                //GlobalConfiguration.Configuration.DependencyResolver = new Ninject.WebApi.DependencyResolver.NinjectDependencyResolver(kernel);

                GlobalConfiguration.Configuration.DependencyResolver = new NinjectDependencyResolver(kernel);
                return kernel;
                //kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                //kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
                //RegisterServices(kernel);
                //return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<EFMT.Abstract.IRepository<EFMT.Entities.ArrivalSostav>>().To<EFMT.Concrete.EFArrivalSostav>();
            kernel.Bind<EFMT.Abstract.IRepository<EFMT.Entities.ArrivalCars>>().To<EFMT.Concrete.EFArrivalCars>();  
            kernel.Bind<EFMT.Abstract.IRepository<EFMT.Entities.ApproachesSostav>>().To<EFMT.Concrete.EFApproachesSostav>();
            kernel.Bind<EFMT.Abstract.IRepository<EFMT.Entities.ApproachesCars>>().To<EFMT.Concrete.EFApproachesCars>();   
            kernel.Bind<EFMT.Abstract.IRepository<EFMT.Entities.Consignee>>().To<EFMT.Concrete.EFConsignee>();  
            
            kernel.Bind<EFMT.Abstract.IRepository<EFMT.Entities.WagonsTracking>>().To<EFMT.Concrete.EFWagonsTracking>();  
            
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_GenusWagons>>().To<EFIDS.Concrete.EFDirectory_GenusWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_WagonManufacturers>>().To<EFIDS.Concrete.EFDirectory_WagonManufacturers>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_TypesRepairsWagons>>().To<EFIDS.Concrete.EFDirectory_TypesRepairsWagons>();
            kernel.Bind<EFIDS.Abstract.IStringRepository<EFIDS.Entities.Directory_ModelsWagons>>().To<EFIDS.Concrete.EFDirectory_ModelsWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_TypeWagons>>().To<EFIDS.Concrete.EFDirectory_TypeWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_TypeOwnerShip>>().To<EFIDS.Concrete.EFDirectory_TypeOwnerShip>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_OwnersWagons>>().To<EFIDS.Concrete.EFDirectory_OwnersWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_LessorsWagons>>().To<EFIDS.Concrete.EFDirectory_LessorsWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_OperatorsWagons>>().To<EFIDS.Concrete.EFDirectory_OperatorsWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_PoligonTravelWagons>>().To<EFIDS.Concrete.EFDirectory_PoligonTravelWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_SpecialConditions>>().To<EFIDS.Concrete.EFDirectory_SpecialConditions>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_DEPO>>().To<EFIDS.Concrete.EFDirectory_DEPO>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_WagonsCondition>>().To<EFIDS.Concrete.EFDirectory_WagonsCondition>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Station>>().To<EFIDS.Concrete.EFDirectory_Station>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Consignee>>().To<EFIDS.Concrete.EFDirectory_Consignee>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Shipper>>().To<EFIDS.Concrete.EFDirectory_Shipper>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_BorderCheckpoint>>().To<EFIDS.Concrete.EFDirectory_BorderCheckpoint>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Countrys>>().To<EFIDS.Concrete.EFDirectory_Countrys>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Railway>>().To<EFIDS.Concrete.EFDirectory_Railway>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_InlandRailway>>().To<EFIDS.Concrete.EFDirectory_InlandRailway>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_ExternalStation>>().To<EFIDS.Concrete.EFDirectory_ExternalStation>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_LimitingLoading>>().To<EFIDS.Concrete.EFDirectory_LimitingLoading>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_ConditionArrival>>().To<EFIDS.Concrete.EFDirectory_ConditionArrival>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_PayerArrival>>().To<EFIDS.Concrete.EFDirectory_PayerArrival>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Cars>>().To<EFIDS.Concrete.EFDirectory_Cars>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Cargo>>().To<EFIDS.Concrete.EFDirectory_Cargo>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_CargoETSNG>>().To<EFIDS.Concrete.EFDirectory_CargoETSNG>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_CargoGNG>>().To<EFIDS.Concrete.EFDirectory_CargoGNG>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_CargoGroup>>().To<EFIDS.Concrete.EFDirectory_CargoGroup>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_CertificationData>>().To<EFIDS.Concrete.EFDirectory_CertificationData>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_CommercialCondition>>().To<EFIDS.Concrete.EFDirectory_CommercialCondition>();
            kernel.Bind<EFIDS.Abstract.IStringRepository<EFIDS.Entities.Directory_HazardClass>>().To<EFIDS.Concrete.EFDirectory_HazardClass>();

            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.CardsWagons>>().To<EFIDS.Concrete.EFCardsWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.CardsWagonsRepairs>>().To<EFIDS.Concrete.EFCardsWagonsRepairs>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.ParksWagons>>().To<EFIDS.Concrete.EFParksWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.ParksListWagons>>().To<EFIDS.Concrete.EFParksListWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.WagonsMotionSignals>>().To<EFIDS.Concrete.EFWagonsMotionSignals>();

            kernel.Bind<EFUZ.Abstract.IRepository<EFUZ.Entities.Directory_States>>().To<EFUZ.Concrete.EFDirectory_States>();            
            kernel.Bind<EFUZ.Abstract.IRepository<EFUZ.Entities.Directory_InternalRailroad>>().To<EFUZ.Concrete.EFDirectory_InternalRailroad>();
            kernel.Bind<EFUZ.Abstract.IRepository<EFUZ.Entities.Directory_Countrys>>().To<EFUZ.Concrete.EFDirectory_Countrys>();
            kernel.Bind<EFUZ.Abstract.IRepository<EFUZ.Entities.Directory_Stations>>().To<EFUZ.Concrete.EFDirectory_Stations>();

            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.ArrivalSostav>>().To<EFIDS.Concrete.EFArrivalSostav>();
            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.ArrivalCars>>().To<EFIDS.Concrete.EFArrivalCars>();
            kernel.Bind<EFIDS.Abstract.IStringRepository<EFIDS.Entities.UZ_DOC>>().To<EFIDS.Concrete.EFUZ_DOC>();  
        }        
    }
}