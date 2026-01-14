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
    using System.Web.Http.Dependencies;


    //Ninject.Activation.Blocks.IActivationBlock


    public static class NinjectWebCommon
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();


        public class NinjectDependencyResolver : NinjectDependencyScope, IDependencyResolver//, IDependencyResolver
        {
            public const string NinjectWebApiRequestScope = "NinjectWebApiRequestScope";

            protected IKernel kernel;

            public NinjectDependencyResolver(IKernel kernel) : base(kernel)
            {
                this.kernel = kernel;
            }

            public IDependencyScope BeginScope()
            {
                return new NinjectDependencyScope(this.kernel.BeginBlock());
            }
        }

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

                var ninjectResolver = new NinjectDependencyResolver(kernel);

                //DependencyResolver.SetResolver(ninjectResolver); // MVC 

                GlobalConfiguration.Configuration.DependencyResolver = ninjectResolver;

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
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_OperatorsWagonsGroup>>().To<EFIDS.Concrete.EFDirectory_OperatorsWagonsGroup>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_PoligonTravelWagons>>().To<EFIDS.Concrete.EFDirectory_PoligonTravelWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_SpecialConditions>>().To<EFIDS.Concrete.EFDirectory_SpecialConditions>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_DEPO>>().To<EFIDS.Concrete.EFDirectory_DEPO>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_WagonsCondition>>().To<EFIDS.Concrete.EFDirectory_WagonsCondition>();

            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Consignee>>().To<EFIDS.Concrete.EFDirectory_Consignee>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Shipper>>().To<EFIDS.Concrete.EFDirectory_Shipper>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_BorderCheckpoint>>().To<EFIDS.Concrete.EFDirectory_BorderCheckpoint>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Countrys>>().To<EFIDS.Concrete.EFDirectory_Countrys>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Railway>>().To<EFIDS.Concrete.EFDirectory_Railway>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_InlandRailway>>().To<EFIDS.Concrete.EFDirectory_InlandRailway>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_ExternalStation>>().To<EFIDS.Concrete.EFDirectory_ExternalStation>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_LimitingLoading>>().To<EFIDS.Concrete.EFDirectory_LimitingLoading>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_ConditionArrival>>().To<EFIDS.Concrete.EFDirectory_ConditionArrival>();
            kernel.Bind<EFIDS.Abstract.IStringRepository<EFIDS.Entities.Directory_PayerSender>>().To<EFIDS.Concrete.EFDirectory_PayerSender>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Wagons>>().To<EFIDS.Concrete.EFDirectory_Wagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_WagonsRent>>().To<EFIDS.Concrete.EFDirectory_WagonsRent>();

            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Cargo>>().To<EFIDS.Concrete.EFDirectory_Cargo>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_CargoETSNG>>().To<EFIDS.Concrete.EFDirectory_CargoETSNG>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_CargoGNG>>().To<EFIDS.Concrete.EFDirectory_CargoGNG>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_CargoGroup>>().To<EFIDS.Concrete.EFDirectory_CargoGroup>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_CargoOutGroup>>().To<EFIDS.Concrete.EFDirectory_CargoOutGroup>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_CertificationData>>().To<EFIDS.Concrete.EFDirectory_CertificationData>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_CommercialCondition>>().To<EFIDS.Concrete.EFDirectory_CommercialCondition>();
            kernel.Bind<EFIDS.Abstract.IStringRepository<EFIDS.Entities.Directory_HazardClass>>().To<EFIDS.Concrete.EFDirectory_HazardClass>();

            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Divisions>>().To<EFIDS.Concrete.EFDirectory_Divisions>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_TypeDivision>>().To<EFIDS.Concrete.EFDirectory_TypeDivision>();

            kernel.Bind<EFIDS.Abstract.IStringRepository<EFIDS.Entities.Directory_Locomotive>>().To<EFIDS.Concrete.EFDirectory_Locomotive>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_LocomotiveStatus>>().To<EFIDS.Concrete.EFDirectory_LocomotiveStatus>();

            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Station>>().To<EFIDS.Concrete.EFDirectory_Station>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_ParkWays>>().To<EFIDS.Concrete.EFDirectory_ParkWays>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Ways>>().To<EFIDS.Concrete.EFDirectory_Ways>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_OuterWays>>().To<EFIDS.Concrete.EFDirectory_OuterWays>();

            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Currency>>().To<EFIDS.Concrete.EFDirectory_Currency>();


            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.CardsWagons>>().To<EFIDS.Concrete.EFCardsWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.CardsWagonsRepairs>>().To<EFIDS.Concrete.EFCardsWagonsRepairs>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.ParksWagons>>().To<EFIDS.Concrete.EFParksWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.ParksListWagons>>().To<EFIDS.Concrete.EFParksListWagons>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.WagonsMotionSignals>>().To<EFIDS.Concrete.EFWagonsMotionSignals>();

            kernel.Bind<EFUZ.Abstract.IRepository<EFUZ.Entities.Directory_States>>().To<EFUZ.Concrete.EFDirectory_States>();
            kernel.Bind<EFUZ.Abstract.IRepository<EFUZ.Entities.Directory_InternalRailroad>>().To<EFUZ.Concrete.EFDirectory_InternalRailroad>();
            kernel.Bind<EFUZ.Abstract.IRepository<EFUZ.Entities.Directory_Countrys>>().To<EFUZ.Concrete.EFDirectory_Countrys>();
            kernel.Bind<EFUZ.Abstract.IRepository<EFUZ.Entities.Directory_Stations>>().To<EFUZ.Concrete.EFDirectory_Stations>();
            kernel.Bind<EFUZ.Abstract.IRepository<EFUZ.Entities.Directory_Cargo>>().To<EFUZ.Concrete.EFDirectory_Cargo>();



            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_Reason_Discrepancy>>().To<EFIDS.Concrete.EFDirectory_Reason_Discrepancy>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Directory_DetentionReturn>>().To<EFIDS.Concrete.EFDirectory_DetentionReturn>();

            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.Arrival_UZ_Document>>().To<EFIDS.Concrete.EFArrival_UZ_Document>();
            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.Arrival_UZ_Vagon>>().To<EFIDS.Concrete.EFArrival_UZ_Vagon>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Arrival_UZ_Cont_Pay>>().To<EFIDS.Concrete.EFArrival_UZ_Cont_Pay>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Arrival_UZ_Document_Acts>>().To<EFIDS.Concrete.EFArrival_UZ_Document_Acts>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Arrival_UZ_Document_Docs>>().To<EFIDS.Concrete.EFArrival_UZ_Document_Docs>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Arrival_UZ_Document_Pay>>().To<EFIDS.Concrete.EFArrival_UZ_Document_Pay>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Arrival_UZ_Vagon_Acts>>().To<EFIDS.Concrete.EFArrival_UZ_Vagon_Acts>();
            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.Arrival_UZ_Vagon_Cont>>().To<EFIDS.Concrete.EFArrival_UZ_Vagon_Cont>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Arrival_UZ_Vagon_Pay>>().To<EFIDS.Concrete.EFArrival_UZ_Vagon_Pay>();
            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.ArrivalSostav>>().To<EFIDS.Concrete.EFArrivalSostav>();
            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.ArrivalCars>>().To<EFIDS.Concrete.EFArrivalCars>();
            kernel.Bind<EFIDS.Abstract.IStringRepository<EFIDS.Entities.UZ_DOC>>().To<EFIDS.Concrete.EFUZ_DOC>();

            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.Outgoing_UZ_Document>>().To<EFIDS.Concrete.EFOutgoing_UZ_Document>();
            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.Outgoing_UZ_Vagon>>().To<EFIDS.Concrete.EFOutgoing_UZ_Vagon>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Outgoing_UZ_Cont_Pay>>().To<EFIDS.Concrete.EFOutgoing_UZ_Cont_Pay>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Outgoing_UZ_Document_Pay>>().To<EFIDS.Concrete.EFOutgoing_UZ_Document_Pay>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Outgoing_UZ_Vagon_Acts>>().To<EFIDS.Concrete.EFOutgoing_UZ_Vagon_Acts>();
            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.Outgoing_UZ_Vagon_Cont>>().To<EFIDS.Concrete.EFOutgoing_UZ_Vagon_Cont>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Outgoing_UZ_Vagon_Pay>>().To<EFIDS.Concrete.EFOutgoing_UZ_Vagon_Pay>();
            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.OutgoingSostav>>().To<EFIDS.Concrete.EFOutgoingSostav>();
            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.OutgoingCars>>().To<EFIDS.Concrete.EFOutgoingCars>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.OutgoingDetentionReturn>>().To<EFIDS.Concrete.EFOutgoingDetentionReturn>();
            kernel.Bind<EFIDS.Abstract.IStringRepository<EFIDS.Entities.UZ_DOC_OUT>>().To<EFIDS.Concrete.EFUZ_DOC_OUT>();

            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.SAPIncomingSupply>>().To<EFIDS.Concrete.EFSAPIncomingSupply>();
            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.SAPOutgoingSupply>>().To<EFIDS.Concrete.EFSAPOutgoingSupply>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Out_Supply>>().To<EFIDS.Concrete.EFOut_Supply>();

            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.InstructionalLetters>>().To<EFIDS.Concrete.EFInstructionalLetters>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.InstructionalLettersWagon>>().To<EFIDS.Concrete.EFInstructionalLettersWagon>();

            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.ParkState_Station>>().To<EFIDS.Concrete.EFParkState_Station>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.ParkState_Wagon>>().To<EFIDS.Concrete.EFParkState_Wagon>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.ParkState_Way>>().To<EFIDS.Concrete.EFParkState_Way>();

            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.Usage_Fee_Period>>().To<EFIDS.Concrete.EFUsage_Fee_Period>();

            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.WagonInternalRoutes>>().To<EFIDS.Concrete.EFWagonInternalRoutes>();
            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.WagonInternalMovement>>().To<EFIDS.Concrete.EFWagonInternalMovement>();
            kernel.Bind<EFIDS.Abstract.ILongRepository<EFIDS.Entities.WagonInternalOperation>>().To<EFIDS.Concrete.EFWagonInternalOperation>();
            kernel.Bind<EFIDS.Abstract.IRepository<EFIDS.Entities.WagonUsageFee>>().To<EFIDS.Concrete.EFWagonUsageFee>();

            kernel.Bind<EFIDS_Arhiv.Abstract.IStringRepository<EFIDS_Arhiv.Entities.UZ_DOC_PDF>>().To<EFIDS_Arhiv.Concrete.EFUZ_DOC_PDF>();

        }
    }
}
